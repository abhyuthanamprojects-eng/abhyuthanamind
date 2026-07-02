<?php

namespace App\Models;

use App\Traits\ResolvesPublicFileUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class ScrapItem extends Model
{
    use ResolvesPublicFileUrl;
    use SoftDeletes;

    protected $fillable = [
        'scrap_category_id', 'name', 'rate', 'unit', 'image_path',
        'description', 'is_active', 'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'rate' => 'decimal:2',
    ];

    protected $appends = ['image_url'];

    public function category()
    {
        return $this->belongsTo(ScrapCategory::class, 'scrap_category_id');
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
        return $query->orderBy('sort_order')->orderBy('name');
    }
}
