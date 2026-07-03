<?php

namespace App\Http\Controllers;

use App\Models\PickupRequest;
use Illuminate\Support\Facades\Storage;

class TrackPickupController extends Controller
{
    public function download(string $token)
    {
        $pickup = $this->findOrFail($token);

        $phone = $pickup->customer_phone;
        $maskedPhone = $phone && strlen($phone) >= 4
            ? substr($phone, 0, 2) . str_repeat('X', max(strlen($phone) - 4, 0)) . substr($phone, -2)
            : ($phone ?? '—');

        return view('pickup-request-details', [
            'pickup' => $pickup,
            'lead' => $pickup->metadata['public_lead'] ?? [],
            'city' => $pickup->city?->name ?? ($pickup->metadata['public_lead']['city'] ?? null),
            'statusLabel' => PickupRequest::TRACKING_STATUSES[$pickup->tracking_status] ?? $pickup->tracking_status,
            'maskedPhone' => $maskedPhone,
            'companyName' => 'Abhyuthanam Recyclers',
            'companyPhone' => '+91 77385 74635',
            'companyEmail' => 'info@abhyuthanamind.com',
            'companyAddress' => 'E-15, UPSIDA Plastic City, Dibiyapur, Uttar Pradesh - 206244',
        ]);
    }

    public function certificate(string $token)
    {
        $pickup = $this->findOrFail($token);
        $certificate = $pickup->certificate;

        abort_if(!$certificate || !$certificate->file_path, 404);

        $fullPath = public_path($certificate->file_path);
        abort_if(!file_exists($fullPath), 404);

        return response()->download($fullPath, 'certificate-' . $pickup->booking_id . '.' . pathinfo($fullPath, PATHINFO_EXTENSION));
    }

    /**
     * Customer download for a generated/uploaded document (Form 6, Form 2,
     * Green Certificate). Only documents that are ready (not `draft`) are
     * reachable here, and only via this pickup's own tracking token.
     */
    public function document(string $token, \App\Models\PickupRequestDocument $document)
    {
        $pickup = $this->findOrFail($token);

        abort_if($document->pickup_request_id !== $pickup->id, 404);
        abort_if($document->status === \App\Models\PickupRequestDocument::STATUS_DRAFT, 404);

        if ($document->file_path) {
            $fullPath = public_path($document->file_path);
            abort_if(!file_exists($fullPath), 404);

            return response()->download($fullPath, $document->document_type . '-' . $pickup->booking_id . '.' . pathinfo($fullPath, PATHINFO_EXTENSION));
        }

        return \App\Http\Controllers\Admin\PickupRequestDocumentController::renderPrintable($pickup, $document);
    }

    private function findOrFail(string $token): PickupRequest
    {
        $pickup = PickupRequest::where('tracking_token', $token)->with('city:id,name', 'certificate')->first();

        abort_if(!$pickup, 404);

        return $pickup;
    }
}
