<?php

namespace App\Models;

use App\Traits\ResolvesPublicFileUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Support\Str;

class Service extends Model
{
    use ResolvesPublicFileUrl;
    use SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'short_description', 'long_description', 'image_path',
        'icon', 'is_active', 'sort_order', 'meta_title', 'meta_description',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected $appends = ['image_url'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($service) {
            if (!$service->slug) {
                $service->slug = Str::slug($service->title);
            }
        });
    }

    public function getImageUrlAttribute()
    {
        return $this->resolvePublicFileUrl($this->image_path);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('title');
    }
}
