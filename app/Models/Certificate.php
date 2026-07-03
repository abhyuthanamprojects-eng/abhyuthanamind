<?php

namespace App\Models;

use App\Traits\ResolvesPublicFileUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Certificate extends Model
{
    use ResolvesPublicFileUrl;
    use SoftDeletes;

    protected $fillable = [
        'name', 'certificate_type', 'file_path', 'issue_date', 'expiry_date',
        'show_on_website', 'is_active', 'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'show_on_website' => 'boolean',
        'issue_date' => 'date',
        'expiry_date' => 'date',
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

    public function scopeVisible($query)
    {
        return $query->where('show_on_website', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }
}
