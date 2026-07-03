<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ScrapCategory;
use App\Traits\ApiResponseTrait;

class ScrapRateController extends Controller
{
    use ApiResponseTrait;

    public function index()
    {
        $categories = ScrapCategory::active()
            ->ordered()
            ->with(['items' => fn ($q) => $q->active()->ordered()])
            ->get(['id', 'title', 'slug', 'icon', 'description', 'sort_order']);

        return $this->successResponse('scrap-rate.fetched', $categories);
    }
}
