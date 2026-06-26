<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PickupRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PickupRequestAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = PickupRequest::query()->with(['city:id,name', 'customer:id,name,email,phone']);

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('customer_name', 'like', '%' . $request->search . '%')
                    ->orWhere('customer_phone', 'like', '%' . $request->search . '%')
                    ->orWhere('pickup_code', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->date) {
            $query->whereDate('scheduled_at', $request->date);
        }

        $pickups = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/PickupRequests/Index', [
            'pickups' => $pickups,
            'filters' => $request->only(['search', 'status', 'date']),
            'stats' => [
                'total' => PickupRequest::count(),
                'pending' => PickupRequest::whereIn('status', ['new', 'pending', 'assigned'])->count(),
                'in_progress' => PickupRequest::whereIn('status', ['in_progress', 'pickup_started', 'warehouse_received'])->count(),
                'completed' => PickupRequest::where('status', 'completed')->count(),
            ],
        ]);
    }

    public function show(PickupRequest $pickupRequest)
    {
        $pickupRequest->load(['city:id,name', 'customer:id,name,email,phone', 'items', 'warehouse:id,name']);

        return Inertia::render('Admin/PickupRequests/Show', [
            'pickup' => $pickupRequest,
        ]);
    }
}
