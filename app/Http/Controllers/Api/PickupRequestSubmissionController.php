<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePublicPickupRequest;
use App\Models\City;
use App\Models\PickupRequest;
use App\Traits\ApiResponseTrait;
use Illuminate\Support\Carbon;

class PickupRequestSubmissionController extends Controller
{
    use ApiResponseTrait;

    public function store(StorePublicPickupRequest $request)
    {
        $data = $request->validated();

        $scheduledAt = Carbon::parse($data['preferred_pickup_date'] . ' ' . $data['preferred_pickup_time']);

        $city = City::whereRaw('LOWER(name) = ?', [strtolower(trim($data['city']))])->first();

        $pickup = PickupRequest::create([
            'request_type' => 'scrap',
            'pickup_code' => $this->generatePickupCode(),
            'customer_name' => $data['full_name'],
            'customer_phone' => $data['mobile_number'],
            'customer_email' => $data['email'] ?? null,
            'city_id' => $city?->id,
            'address' => $data['pickup_address'],
            'scheduled_at' => $scheduledAt,
            'status' => 'pending',
            'estimated_amount' => 0,
            'metadata' => [
                'public_lead' => [
                    'source' => 'website',
                    'customer_type' => $data['customer_type'],
                    'company_name' => $data['company_name'] ?? null,
                    'city' => $data['city'],
                    'scrap_category' => $data['scrap_category'],
                    'approximate_quantity' => $data['approximate_quantity'] ?? null,
                    'preferred_contact_method' => $data['preferred_contact_method'] ?? null,
                    'description' => $data['description'] ?? null,
                    'selected_scrap_item' => $data['selected_scrap_item'] ?? null,
                ],
            ],
        ]);

        return $this->successResponse('pickup-requests.submitted', [
            'booking_id' => $pickup->booking_id,
            'tracking_url' => $pickup->tracking_url,
        ]);
    }

    private function generatePickupCode(): string
    {
        return 'WEB-' . now()->format('YmdHi') . '-' . strtoupper(substr(uniqid(), -4));
    }
}
