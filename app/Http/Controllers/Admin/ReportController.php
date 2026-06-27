<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\PickupRequest;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Real-data analytics built from existing PickupRequest/ContactMessage
     * tables — no new schema. Covers the last 6 calendar months.
     */
    public function index()
    {
        $months = collect(range(5, 0))->map(fn ($i) => Carbon::now()->subMonths($i)->startOfMonth());

        $monthlyPickups = $months->map(function (Carbon $month) {
            return [
                'm' => $month->format('M'),
                'v' => PickupRequest::whereBetween('created_at', [$month->copy()->startOfMonth(), $month->copy()->endOfMonth()])->count(),
            ];
        })->values();

        $revenueTrend = $months->map(function (Carbon $month) {
            return [
                'm' => $month->format('M'),
                'v' => (int) PickupRequest::where('tracking_status', 'completed')
                    ->whereBetween('created_at', [$month->copy()->startOfMonth(), $month->copy()->endOfMonth()])
                    ->sum('final_amount'),
            ];
        })->values();

        $totalPickups = PickupRequest::count();
        $completedPickups = PickupRequest::where('tracking_status', 'completed')->count();
        $pickupConversion = $totalPickups > 0 ? round(($completedPickups / $totalPickups) * 100) : 0;

        $totalContacts = ContactMessage::count();
        $resolvedContacts = ContactMessage::where('status', 'resolved')->count();
        $contactConversion = $totalContacts > 0 ? round(($resolvedContacts / $totalContacts) * 100) : 0;

        $scrapCategoryMix = PickupRequest::query()
            ->whereNotNull('metadata')
            ->get(['metadata'])
            ->map(fn ($p) => $p->metadata['public_lead']['scrap_category'] ?? null)
            ->filter()
            ->countBy()
            ->sortDesc()
            ->take(8)
            ->map(fn ($count, $category) => ['category' => $category, 'count' => $count])
            ->values();

        return Inertia::render('Admin/Reports/Index', [
            'monthlyPickups' => $monthlyPickups,
            'revenueTrend' => $revenueTrend,
            'scrapCategoryMix' => $scrapCategoryMix,
            'leadConversion' => [
                'pickups_total' => $totalPickups,
                'pickups_completed' => $completedPickups,
                'pickups_rate' => $pickupConversion,
                'contacts_total' => $totalContacts,
                'contacts_resolved' => $resolvedContacts,
                'contacts_rate' => $contactConversion,
            ],
        ]);
    }
}
