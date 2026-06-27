<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Support\Str;

class Industry extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'short_description', 'long_description', 'image_path',
        'is_active', 'sort_order', 'meta_title', 'meta_description',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected $appends = ['image_url'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($industry) {
            if (!$industry->slug) {
                $industry->slug = Str::slug($industry->title);
            }
        });
    }

    public function getImageUrlAttribute()
    {
        return $this->image_path ? asset($this->image_path) : null;
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
