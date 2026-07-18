<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PickupRequest;
use App\Models\PickupRequestDocument;
use App\Services\MediaCompressionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PickupRequestDocumentController extends Controller
{
    /**
     * Per-document-type field rules used for both "Generate" (printable
     * HTML rendered from these fields on demand) and as metadata stored
     * alongside an "Upload" of a final PDF/DOCX.
     */
    private function fieldRules(string $type): array
    {
        return match ($type) {
            PickupRequestDocument::TYPE_FORM_6 => [
                'sender_name' => 'nullable|string|max:200',
                'sender_address' => 'nullable|string|max:500',
                'sender_phone' => 'nullable|string|max:50',
                'sender_authorization_no' => 'nullable|string|max:100',
                'transporter_name' => 'nullable|string|max:200',
                'transporter_address' => 'nullable|string|max:500',
                'transporter_phone' => 'nullable|string|max:50',
                'vehicle_type' => 'nullable|string|max:100',
                'transporter_registration_no' => 'nullable|string|max:100',
                'vehicle_registration_no' => 'nullable|string|max:100',
                'receiver_name' => 'nullable|string|max:200',
                'receiver_address' => 'nullable|string|max:500',
                'receiver_authorization_no' => 'nullable|string|max:100',
                'ewaste_description' => 'nullable|string|max:1000',
                'pickup_date' => 'nullable|date',
            ],
            PickupRequestDocument::TYPE_FORM_2 => [
                'client_company_name' => 'nullable|string|max:200',
                'client_address' => 'nullable|string|max:500',
                'tax_invoice_number' => 'nullable|string|max:100',
                'weight_kg' => 'nullable|numeric|min:0',
                'vehicle_number' => 'nullable|string|max:100',
                'manifest_number' => 'nullable|string|max:100',
                'date' => 'nullable|date',
                'registration_no' => 'nullable|string|max:100',
                'valid_till' => 'nullable|string|max:50',
                'director_name' => 'nullable|string|max:150',
                'notes' => 'nullable|string|max:1000',
            ],
            PickupRequestDocument::TYPE_GREEN_CERTIFICATE => [
                'client_company_name' => 'nullable|string|max:200',
                'manifest_number' => 'nullable|string|max:100',
                'tax_invoice_number' => 'nullable|string|max:100',
                'date' => 'nullable|date',
                'recycled_percentage' => 'nullable|numeric|min:0|max:100',
                'refurbished_percentage' => 'nullable|numeric|min:0|max:100',
                'quantity' => 'nullable|string|max:100',
                'registration_no' => 'nullable|string|max:100',
                'director_name' => 'nullable|string|max:150',
            ],
            default => [
                'notes' => 'nullable|string|max:2000',
            ],
        };
    }

    public function store(Request $request, PickupRequest $pickupRequest)
    {
        $documentType = $request->validate([
            'document_type' => 'required|in:' . implode(',', array_keys(PickupRequestDocument::TYPE_LABELS)),
        ])['document_type'];

        $mode = $request->input('mode', 'generate');

        $data = $request->validate(array_merge(
            $this->fieldRules($documentType),
            [
                'document_number' => 'nullable|string|max:100',
                'file' => $mode === 'upload' ? 'required|file|mimes:pdf,jpg,jpeg,png,docx|max:10240' : 'nullable|file|mimes:pdf,jpg,jpeg,png,docx|max:10240',
            ],
        ));

        $existing = PickupRequestDocument::where('pickup_request_id', $pickupRequest->id)
            ->where('document_type', $documentType)
            ->first();

        $payload = [
            'document_number' => $data['document_number'] ?? $existing?->document_number,
            'generated_data' => array_diff_key($data, array_flip(['document_number', 'file'])),
            'uploaded_by' => $request->user()->id,
            'issued_at' => now(),
        ];

        if ($request->hasFile('file')) {
            if ($existing && $existing->file_path) {
                Storage::disk('public')->delete($existing->file_path);
            }
            $payload['file_path'] = MediaCompressionService::store($request->file('file'), 'pickup-documents');
            $payload['status'] = PickupRequestDocument::STATUS_UPLOADED;
        } else {
            $payload['status'] = PickupRequestDocument::STATUS_GENERATED;
        }

        PickupRequestDocument::updateOrCreate(
            ['pickup_request_id' => $pickupRequest->id, 'document_type' => $documentType],
            $payload,
        );

        return back()->with('success', PickupRequestDocument::TYPE_LABELS[$documentType] . ' saved.');
    }

    public function preview(PickupRequest $pickupRequest, PickupRequestDocument $document)
    {
        abort_if($document->pickup_request_id !== $pickupRequest->id, 404);

        if ($document->file_path) {
            return redirect(asset($document->file_path));
        }

        return $this->renderPrintable($pickupRequest, $document);
    }

    public function destroy(PickupRequest $pickupRequest, PickupRequestDocument $document)
    {
        abort_if($document->pickup_request_id !== $pickupRequest->id, 404);

        if ($document->file_path) {
            Storage::disk('public')->delete($document->file_path);
        }
        $document->delete();

        return back()->with('success', 'Document removed.');
    }

    public static function renderPrintable(PickupRequest $pickupRequest, PickupRequestDocument $document)
    {
        $view = match ($document->document_type) {
            PickupRequestDocument::TYPE_FORM_6 => 'documents.form-6',
            PickupRequestDocument::TYPE_FORM_2 => 'documents.form-2',
            PickupRequestDocument::TYPE_GREEN_CERTIFICATE => 'documents.green-certificate',
            default => null,
        };

        abort_if(!$view, 404);

        return view($view, [
            'pickup' => $pickupRequest,
            'doc' => $document,
            'data' => $document->generated_data ?? [],
        ]);
    }
}
