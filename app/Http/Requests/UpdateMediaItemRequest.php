<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMediaItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'nullable|string|max:150',
            'category' => 'nullable|string|max:100',
            'file' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:8192',
            'alt_text' => 'nullable|string|max:150',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ];
    }
}
