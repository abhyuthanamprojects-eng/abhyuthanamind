<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PickupQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PickupQueryAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = PickupQuery::query();

        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('query_id', 'like', "%{$search}%")
                    ->orWhere('full_name', 'like', "%{$search}%")
                    ->orWhere('mobile_number', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%")
                    ->orWhere('scrap_category', 'like', "%{$search}%");
            });
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->date) {
            $query->whereDate('preferred_pickup_date', $request->date);
        }

        if ($request->scrap_category) {
            $query->where('scrap_category', $request->scrap_category);
        }

        $queries = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Admin/PickupQueries/Index', [
            'queries' => $queries,
            'filters' => $request->only(['search', 'status', 'date', 'scrap_category']),
            'stats' => [
                'total' => PickupQuery::count(),
                'new' => PickupQuery::where('status', PickupQuery::STATUS_NEW)->count(),
                'negotiation' => PickupQuery::whereIn('status', [PickupQuery::STATUS_UNDER_REVIEW, PickupQuery::STATUS_NEGOTIATION])->count(),
                'converted' => PickupQuery::where('status', PickupQuery::STATUS_CONVERTED)->count(),
                'rejected' => PickupQuery::where('status', PickupQuery::STATUS_REJECTED)->count(),
            ],
            'statusOptions' => PickupQuery::STATUSES,
        ]);
    }

    public function show(PickupQuery $pickupQuery)
    {
        $pickupQuery->load(['convertedPickupRequest:id,booking_id,tracking_token', 'convertedBy:id,name']);

        return Inertia::render('Admin/PickupQueries/Show', [
            'query' => $pickupQuery,
            'statusOptions' => PickupQuery::STATUSES,
        ]);
    }

    public function update(Request $request, PickupQuery $pickupQuery)
    {
        $data = $request->validate([
            'negotiation_notes' => 'nullable|string|max:2000',
            'quoted_amount' => 'nullable|numeric|min:0',
            'final_amount' => 'nullable|numeric|min:0',
            'status' => 'nullable|string|in:' . implode(',', array_keys(PickupQuery::STATUSES)),
        ]);

        $pickupQuery->update(array_filter($data, fn ($v) => $v !== null) + [
            'status' => $data['status'] ?? $pickupQuery->status,
        ]);

        return back()->with('success', 'Pickup query updated.');
    }

    public function accept(Request $request, PickupQuery $pickupQuery)
    {
        if ($pickupQuery->status === PickupQuery::STATUS_CONVERTED) {
            return back()->withErrors(['status' => 'This query has already been converted.']);
        }

        $request->validate([
            'final_amount' => 'nullable|numeric|min:0',
        ]);

        if ($request->filled('final_amount')) {
            $pickupQuery->update(['final_amount' => $request->final_amount]);
        }

        $pickup = $pickupQuery->convertToPickupRequest($request->user()->id);

        return redirect()->route('admin.pickups.show', $pickup->id)
            ->with('success', "Pickup request {$pickup->booking_id} created successfully.");
    }

    public function reject(Request $request, PickupQuery $pickupQuery)
    {
        $data = $request->validate([
            'negotiation_notes' => 'nullable|string|max:2000',
        ]);

        $pickupQuery->update([
            'status' => PickupQuery::STATUS_REJECTED,
            'negotiation_notes' => $data['negotiation_notes'] ?? $pickupQuery->negotiation_notes,
        ]);

        return back()->with('success', 'Pickup query rejected.');
    }

    public function destroy(PickupQuery $pickupQuery)
    {
        $pickupQuery->delete();

        return redirect()->route('admin.pickup-queries.index')->with('success', 'Pickup query deleted.');
    }
}
