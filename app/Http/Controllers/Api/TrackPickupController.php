<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PickupRequest;
use App\Traits\ApiResponseTrait;

class TrackPickupController extends Controller
{
    use ApiResponseTrait;

    public function show(string $token)
    {
        $pickup = PickupRequest::where('tracking_token', $token)
            ->with(['statusHistories' => fn ($q) => $q->orderBy('created_at'), 'certificate', 'city:id,name'])
            ->first();

        if (!$pickup) {
            return $this->errorResponse('track-pickup.not_found', 404);
        }

        $lead = $pickup->metadata['public_lead'] ?? [];

        return $this->successResponse('track-pickup.fetched', [
            'booking_id' => $pickup->booking_id,
            'customer_name' => $pickup->customer_name,
            'city' => $pickup->city?->name ?? $lead['city'] ?? null,
            'scrap_category' => $lead['scrap_category'] ?? null,
            'selected_scrap_item' => $lead['selected_scrap_item'] ?? null,
            'approximate_quantity' => $lead['approximate_quantity'] ?? null,
            'scheduled_at' => $pickup->scheduled_at,
            'submitted_at' => $pickup->created_at,
            'tracking_status' => $pickup->tracking_status,
            'tracking_status_label' => PickupRequest::TRACKING_STATUSES[$pickup->tracking_status] ?? $pickup->tracking_status,
            'status_options' => PickupRequest::TRACKING_STATUSES,
            'public_notes' => $pickup->public_notes,
            'status_history' => $pickup->statusHistories->map(fn ($h) => [
                'status' => $h->status,
                'status_label' => PickupRequest::TRACKING_STATUSES[$h->status] ?? $h->status,
                'created_at' => $h->created_at,
            ]),
            'has_certificate' => (bool) $pickup->certificate,
            'certificate_number' => $pickup->certificate?->certificate_number,
            'certificate_issued_at' => $pickup->certificate?->issued_at,
        ]);
    }
}
