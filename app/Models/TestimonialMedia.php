<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TestimonialMedia extends Model
{
    public const TYPE_IMAGE = 'image';
    public const TYPE_VIDEO = 'video';
    public const TYPE_VIDEO_URL = 'video_url';

    protected $fillable = [
        'testimonial_id', 'media_type', 'file_path', 'video_url',
        'thumbnail_path', 'title', 'sort_order',
    ];

    protected $appends = ['file_url', 'thumbnail_url'];

    public function testimonial()
    {
        return $this->belongsTo(Testimonial::class);
    }

    public function getFileUrlAttribute(): ?string
    {
        if ($this->video_url) {
            return $this->video_url;
        }

        return $this->file_path ? asset($this->file_path) : null;
    }

    public function getThumbnailUrlAttribute(): ?string
    {
        return $this->thumbnail_path ? asset($this->thumbnail_path) : null;
    }
}
