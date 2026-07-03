<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer_name' => 'required|string|max:150',
            'designation' => 'nullable|string|max:150',
            'company_name' => 'nullable|string|max:150',
            'industry' => 'nullable|string|max:150',
            'city' => 'nullable|string|max:150',
            'media' => 'nullable|file|mimetypes:image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm,video/x-msvideo|max:51200',
            'video_url' => 'nullable|url|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'review_text' => 'required|string',
            'outcome_text' => 'nullable|string',
            'outcome_label' => 'nullable|string|max:150',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'consent_to_publish' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ];
    }
}
