<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use App\Models\MediaItem;
use App\Traits\ApiResponseTrait;

class FoundersController extends Controller
{
    use ApiResponseTrait;

    public function index()
    {
        $founders = AppSetting::get('founders_data', []);

        if (empty($founders)) {
            return $this->successResponse('founders.fetched', []);
        }

        $mediaIds = collect($founders)->pluck('media_id')->filter()->values()->all();
        $media = MediaItem::whereIn('id', $mediaIds)->get(['id', 'file_path'])->keyBy('id');

        $result = collect($founders)->map(function ($f) use ($media) {
            $item = isset($f['media_id']) ? $media->get($f['media_id']) : null;
            return [
                'name'        => $f['name'] ?? '',
                'role'        => $f['role'] ?? '',
                'bio'         => $f['bio'] ?? '',
                'leads'       => $f['leads'] ?? '',
                'linkedin_url' => $f['linkedin_url'] ?? '',
                'tagline'     => $f['tagline'] ?? '',
                'message'     => $f['message'] ?? '',
                'image_url'   => $item ? $item->file_url : null,
            ];
        });

        return $this->successResponse('founders.fetched', $result);
    }
}
