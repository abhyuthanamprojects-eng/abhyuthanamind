<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePageSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'page_key' => 'required|string|max:60',
            'section_key' => 'required|string|max:60|unique:page_sections,section_key,NULL,id,page_key,' . $this->input('page_key'),
            'title' => 'nullable|string|max:200',
            'subtitle' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'image' => 'nullable|image|max:4096',
            'json_data' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ];
    }
}
