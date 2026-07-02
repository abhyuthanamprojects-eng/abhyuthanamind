<?php

namespace App\Models;

use App\Traits\ResolvesPublicFileUrl;
use Illuminate\Database\Eloquent\Model;

class HomeBanner extends Model
{
    use ResolvesPublicFileUrl;
    protected $fillable = ['image_path', 'text', 'sort_order'];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->resolvePublicFileUrl($this->image_path);
    }
}
