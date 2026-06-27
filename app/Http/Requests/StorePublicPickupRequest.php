<?php

namespace App\Http\Requests;

use App\Helpers\PhoneNumberHelper;
use Illuminate\Foundation\Http\FormRequest;

class StorePublicPickupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'mobile_number' => PhoneNumberHelper::normalizeIndianMobile($this->input('mobile_number'))
                ?? $this->input('mobile_number'),
        ]);
    }

    public function rules(): array
    {
        return [
            'customer_type' => 'required|string|max:50',
            'full_name' => 'required|string|max:150',
            'mobile_number' => 'required|string|regex:/^[6-9]\d{9}$/',
            'email' => 'nullable|email|max:255',
            'company_name' => 'nullable|string|max:150',
            'city' => 'required|string|max:150',
            'pickup_address' => 'required|string|max:500',
            'scrap_category' => 'required|string|max:150',
            'approximate_quantity' => 'nullable|string|max:100',
            'preferred_contact_method' => 'nullable|string|max:50',
            'preferred_pickup_date' => 'required|date|after_or_equal:today',
            'preferred_pickup_time' => 'required|string|max:20',
            'description' => 'nullable|string|max:2000',
            'selected_scrap_item' => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'mobile_number.regex' => 'Please enter a valid 10-digit Indian mobile number.',
        ];
    }
}
