<?php

namespace App\Models;

use App\Traits\ResolvesPublicFileUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class MediaItem extends Model
{
    use ResolvesPublicFileUrl;
    use SoftDeletes;

    protected $fillable = [
        'title', 'category', 'file_path', 'alt_text', 'is_active', 'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected $appends = ['file_url'];

    public function getFileUrlAttribute()
    {
        return $this->resolvePublicFileUrl($this->file_path);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }
}
