<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class PageSection extends Model
{
    protected $fillable = [
        'page_key', 'section_key', 'title', 'subtitle', 'content',
        'image_path', 'json_data', 'is_active', 'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'json_data' => 'array',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image_path ? asset($this->image_path) : null;
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeForPage($query, string $pageKey)
    {
        return $query->where('page_key', $pageKey);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }
}
