<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePublicTestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer_name' => 'required|string|max:150',
            'company_name' => 'required|string|max:150',
            'designation' => 'nullable|string|max:150',
            'city' => 'nullable|string|max:150',
            'industry' => 'nullable|string|max:150',
            'rating' => 'required|integer|min:1|max:5',
            'review_text' => 'required|string|min:20|max:2000',
            'outcome_label' => 'nullable|string|max:150',
            'outcome_text' => 'nullable|string|max:255',
            'customer_photo' => 'nullable|image|max:2048',
            'images' => 'nullable|array|max:6',
            'images.*' => 'image|max:5120',
            'video' => 'nullable|file|mimetypes:video/mp4,video/quicktime,video/webm|max:51200',
            'video_url' => 'nullable|url|max:255',
            'consent_to_publish' => 'accepted',
            'source' => 'nullable|string|max:100',
            // Honeypot: must stay empty. Real users never see or fill this field.
            'website' => 'prohibited',
        ];
    }

    public function messages(): array
    {
        return [
            'consent_to_publish.accepted' => 'Please confirm you allow us to review and publish your feedback.',
            'review_text.min' => 'Please share a little more detail (at least 20 characters).',
        ];
    }
}
