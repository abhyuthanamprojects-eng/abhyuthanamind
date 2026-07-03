<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePickupQueryRequest;
use App\Models\PickupQuery;
use App\Traits\ApiResponseTrait;

class PickupQuerySubmissionController extends Controller
{
    use ApiResponseTrait;

    /**
     * Website "Schedule Pickup" form submissions land here as a query for
     * admin review/negotiation — they do NOT create a PickupRequest (and
     * therefore no booking ID / tracking link) until an admin accepts and
     * converts the query via PickupQuery::convertToPickupRequest().
     */
    public function store(StorePickupQueryRequest $request)
    {
        $data = $request->validated();

        $query = PickupQuery::create([
            'customer_type' => $data['customer_type'],
            'full_name' => $data['full_name'],
            'mobile_number' => $data['mobile_number'],
            'email' => $data['email'] ?? null,
            'company_name' => $data['company_name'] ?? null,
            'city' => $data['city'],
            'pickup_address' => $data['pickup_address'],
            'scrap_category' => $data['scrap_category'],
            'selected_scrap_item' => $data['selected_scrap_item'] ?? null,
            'approximate_quantity' => $data['approximate_quantity'] ?? null,
            'preferred_contact_method' => $data['preferred_contact_method'] ?? null,
            'preferred_pickup_date' => $data['preferred_pickup_date'],
            'preferred_pickup_time' => $data['preferred_pickup_time'],
            'description' => $data['description'] ?? null,
        ]);

        return $this->successResponse('pickup-queries.submitted', [
            'query_id' => $query->query_id,
            'message' => 'Your pickup enquiry has been submitted. Our team will review the details and contact you shortly.',
        ]);
    }
}
