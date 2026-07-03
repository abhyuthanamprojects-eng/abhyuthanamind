<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PickupRequest;
use App\Models\PickupRequestCertificate;
use App\Services\MediaCompressionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PickupRequestAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = PickupRequest::query()->with(['city:id,name', 'customer:id,name,email,phone']);

        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('customer_name', 'like', "%{$search}%")
                    ->orWhere('customer_phone', 'like', "%{$search}%")
                    ->orWhere('pickup_code', 'like', "%{$search}%")
                    ->orWhere('booking_id', 'like', "%{$search}%")
                    ->orWhere('metadata->public_lead->scrap_category', 'like', "%{$search}%")
                    ->orWhere('metadata->public_lead->city', 'like', "%{$search}%")
                    ->orWhereHas('city', fn ($cityQuery) => $cityQuery->where('name', 'like', "%{$search}%"));
            });
        }

        if ($request->status) {
            $query->where('tracking_status', $request->status);
        }

        if ($request->date) {
            $query->whereDate('scheduled_at', $request->date);
        }

        if ($request->scrap_category) {
            $query->where('metadata->public_lead->scrap_category', $request->scrap_category);
        }

        $pickups = $query->latest()->paginate(10)->withQueryString();

        $terminalStatuses = ['pending', 'completed', 'cancelled'];

        return Inertia::render('Admin/PickupRequests/Index', [
            'pickups' => $pickups,
            'filters' => $request->only(['search', 'status', 'date', 'scrap_category']),
            'stats' => [
                'total' => PickupRequest::count(),
                'pending' => PickupRequest::where('tracking_status', 'pending')->count(),
                'active' => PickupRequest::whereNotIn('tracking_status', $terminalStatuses)->count(),
                'completed' => PickupRequest::where('tracking_status', 'completed')->count(),
                'cancelled' => PickupRequest::where('tracking_status', 'cancelled')->count(),
            ],
            'statusOptions' => PickupRequest::TRACKING_STATUSES,
        ]);
    }

    public function show(PickupRequest $pickupRequest)
    {
        $pickupRequest->load([
            'city:id,name',
            'customer:id,name,email,phone',
            'items',
            'statusHistories.changedBy:id,name',
            'certificate',
            'documents',
            'pickupQuery:id,query_id',
        ]);

        return Inertia::render('Admin/PickupRequests/Show', [
            'pickup' => $pickupRequest,
            'statusOptions' => PickupRequest::TRACKING_STATUSES,
            'stepOrder' => PickupRequest::TRACKING_STEP_ORDER,
        ]);
    }

    public function updateMaterialProcessing(Request $request, PickupRequest $pickupRequest)
    {
        $data = $request->validate([
            'total_quantity' => 'nullable|numeric|min:0',
            'recycled_percentage' => 'nullable|numeric|min:0|max:100',
            'refurbished_percentage' => 'nullable|numeric|min:0|max:100',
            'disposed_percentage' => 'nullable|numeric|min:0|max:100',
            'recycled_quantity' => 'nullable|numeric|min:0',
            'refurbished_quantity' => 'nullable|numeric|min:0',
            'processing_notes' => 'nullable|string|max:2000',
        ]);

        $totalPercentage = ($data['recycled_percentage'] ?? 0)
            + ($data['refurbished_percentage'] ?? 0)
            + ($data['disposed_percentage'] ?? 0);

        if ($totalPercentage > 100) {
            return back()->withErrors(['recycled_percentage' => 'Recycled + refurbished + disposed percentages cannot exceed 100%.']);
        }

        $pickupRequest->update($data);

        return back()->with('success', 'Material processing details saved.');
    }

    public function updateStatus(Request $request, PickupRequest $pickupRequest)
    {
        $data = $request->validate([
            'tracking_status' => 'required|string|in:' . implode(',', array_keys(PickupRequest::TRACKING_STATUSES)),
            'note' => 'nullable|string|max:1000',
            'public_note' => 'nullable|string|max:1000',
        ]);

        $pickupRequest->updateTrackingStatus(
            $data['tracking_status'],
            $data['note'] ?? null,
            $request->user()->id,
            $data['public_note'] ?? null,
        );

        return back()->with('success', 'Status updated.');
    }

    public function uploadCertificate(Request $request, PickupRequest $pickupRequest)
    {
        $data = $request->validate([
            'certificate_file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240',
            'certificate_number' => 'nullable|string|max:100',
            'issued_at' => 'nullable|date',
            'notes' => 'nullable|string|max:1000',
        ]);

        $existing = $pickupRequest->certificate;
        if ($existing && $existing->file_path) {
            Storage::disk('public')->delete($existing->file_path);
        }

        $path = MediaCompressionService::store($request->file('certificate_file'), 'pickup-certificates');

        PickupRequestCertificate::updateOrCreate(
            ['pickup_request_id' => $pickupRequest->id],
            [
                'certificate_number' => $data['certificate_number'] ?? null,
                'file_path' => $path,
                'issued_at' => $data['issued_at'] ?? now(),
                'notes' => $data['notes'] ?? null,
                'uploaded_by' => $request->user()->id,
            ]
        );

        return back()->with('success', 'Certificate uploaded.');
    }

    public function destroyCertificate(PickupRequest $pickupRequest)
    {
        $certificate = $pickupRequest->certificate;
        if ($certificate) {
            if ($certificate->file_path) {
                Storage::disk('public')->delete($certificate->file_path);
            }
            $certificate->delete();
        }

        return back()->with('success', 'Certificate removed.');
    }
}
