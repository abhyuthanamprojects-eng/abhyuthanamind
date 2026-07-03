<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MediaItem;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    use ApiResponseTrait;

    /**
     * Public, read-only media listing. Currently not consumed by any public
     * page yet — About/Process/etc. still use static bundled images — this
     * exists so the admin-managed Media Gallery can be wired up to the live
     * site incrementally without a backend change each time.
     */
    public function index(Request $request)
    {
        $items = MediaItem::active()
            ->when($request->category, fn ($q, $category) => $q->where('category', $category))
            ->ordered()
            ->get(['id', 'title', 'category', 'alt_text', 'sort_order', 'file_path']);

        return $this->successResponse('media.fetched', $items);
    }
}
