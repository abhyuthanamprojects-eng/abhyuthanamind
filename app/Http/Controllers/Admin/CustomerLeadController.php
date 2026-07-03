<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\PickupRequest;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class CustomerLeadController extends Controller
{
    /**
     * Read-only aggregated view of customers/leads. There is no dedicated
     * Customer/Lead table — this combines the two real sources of contact
     * we have today (contact form enquiries + public pickup request leads)
     * into one list. Merged in PHP rather than a SQL UNION since the two
     * source tables have different shapes; capped at the most recent 300
     * rows per source, which comfortably covers current traffic.
     */
    public function index(Request $request)
    {
        $search = $request->string('search')->toString();
        $type = $request->string('type')->toString();
        $status = $request->string('status')->toString();

        $contacts = ContactMessage::query()
            ->latest()
            ->take(300)
            ->get()
            ->map(fn (ContactMessage $c) => [
                'id' => 'contact-' . $c->id,
                'type' => 'contact',
                'type_label' => 'Contact Enquiry',
                'name' => $c->name,
                'company' => null,
                'city' => null,
                'status' => $c->status,
                'estimated_value' => null,
                'last_contact' => $c->created_at,
                'link' => route('admin.contacts.show', $c->id),
            ]);

        $pickups = PickupRequest::query()
            ->with('city:id,name')
            ->latest()
            ->take(300)
            ->get()
            ->map(function (PickupRequest $p) {
                $lead = $p->metadata['public_lead'] ?? [];

                return [
                    'id' => 'pickup-' . $p->id,
                    'type' => 'pickup',
                    'type_label' => 'Pickup Request',
                    'name' => $p->customer_name,
                    'company' => $lead['company_name'] ?? null,
                    'city' => $p->city?->name ?? $lead['city'] ?? null,
                    'status' => $p->tracking_status,
                    'estimated_value' => $p->estimated_amount > 0 ? $p->estimated_amount : null,
                    'last_contact' => $p->updated_at,
                    'link' => route('admin.pickups.show', $p->id),
                ];
            });

        $merged = $contacts->concat($pickups)
            ->when($type, fn (Collection $c) => $c->where('type', $type))
            ->when($status, fn (Collection $c) => $c->where('status', $status))
            ->when($search, fn (Collection $c) => $c->filter(fn ($row) => str_contains(strtolower($row['name'] ?? ''), strtolower($search))
                || str_contains(strtolower($row['company'] ?? ''), strtolower($search))
                || str_contains(strtolower($row['city'] ?? ''), strtolower($search))))
            ->sortByDesc('last_contact')
            ->values();

        $perPage = 15;
        $currentPage = (int) $request->get('page', 1);
        $items = $merged->slice(($currentPage - 1) * $perPage, $perPage)->values();

        $paginator = new LengthAwarePaginator(
            $items,
            $merged->count(),
            $perPage,
            $currentPage,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        return Inertia::render('Admin/Customers/Index', [
            'leads' => $paginator,
            'filters' => $request->only(['search', 'type', 'status']),
            'stats' => [
                'total' => $merged->count(),
                'contacts' => $contacts->count(),
                'pickups' => $pickups->count(),
            ],
        ]);
    }
}
