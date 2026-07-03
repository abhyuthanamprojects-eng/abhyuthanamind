<?php

namespace App\Models;

use App\Traits\ResolvesPublicFileUrl;
use Illuminate\Database\Eloquent\Model;


class PageSection extends Model
{
    use ResolvesPublicFileUrl;
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
        return $this->resolvePublicFileUrl($this->image_path);
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
