<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreIndustryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:150',
            'slug' => 'nullable|string|max:150|unique:industries,slug',
            'short_description' => 'nullable|string|max:255',
            'long_description' => 'nullable|string',
            'image' => 'nullable|image|max:4096',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
            'meta_title' => 'nullable|string|max:160',
            'meta_description' => 'nullable|string|max:255',
        ];
    }
}
