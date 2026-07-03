<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateScrapItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'scrap_category_id' => 'required|exists:scrap_categories,id',
            'name' => 'required|string|max:150',
            'rate' => 'required|numeric|min:0',
            'unit' => 'required|in:piece,kg',
            'image' => 'nullable|image|max:4096',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ];
    }
}
