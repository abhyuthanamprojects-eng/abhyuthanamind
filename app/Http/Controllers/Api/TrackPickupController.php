<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PickupRequest;
use App\Models\PickupRequestDocument;
use App\Traits\ApiResponseTrait;

class TrackPickupController extends Controller
{
    use ApiResponseTrait;

    public function show(string $token)
    {
        $pickup = PickupRequest::where('tracking_token', $token)
            ->with([
                'statusHistories' => fn ($q) => $q->orderBy('created_at'),
                'documents',
                'city:id,name',
            ])
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
            'step_order' => PickupRequest::TRACKING_STEP_ORDER,
            'public_notes' => $pickup->public_notes,
            'status_history' => $pickup->statusHistories->map(fn ($h) => [
                'status' => $h->status,
                'status_label' => $h->title ?? (PickupRequest::TRACKING_STATUSES[$h->status] ?? $h->status),
                'public_note' => $h->public_note,
                'created_at' => $h->created_at,
            ]),
            'material_processing' => [
                'total_quantity' => $pickup->total_quantity,
                'recycled_percentage' => $pickup->recycled_percentage,
                'refurbished_percentage' => $pickup->refurbished_percentage,
                'disposed_percentage' => $pickup->disposed_percentage,
            ],
            'documents' => collect(PickupRequestDocument::TYPE_LABELS)
                ->except(PickupRequestDocument::TYPE_OTHER)
                ->map(function ($label, $type) use ($pickup) {
                    $doc = $pickup->documents->firstWhere('document_type', $type);
                    $ready = $doc && in_array($doc->status, [
                        PickupRequestDocument::STATUS_GENERATED,
                        PickupRequestDocument::STATUS_UPLOADED,
                        PickupRequestDocument::STATUS_SENT,
                    ]);

                    return [
                        'type' => $type,
                        'label' => $label,
                        'ready' => $ready,
                        'issued_at' => $ready ? $doc->issued_at : null,
                        'download_url' => $ready ? url("/track-pickup/{$pickup->tracking_token}/documents/{$doc->id}") : null,
                    ];
                })
                ->values(),
        ]);
    }
}
