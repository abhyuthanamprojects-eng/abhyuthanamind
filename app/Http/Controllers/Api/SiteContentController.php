<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Industry;
use App\Models\PageSection;
use App\Models\Service;
use App\Traits\ApiResponseTrait;

/**
 * Public read-only endpoints exposing admin-managed website content
 * (Services, Industries, Page Sections). The React frontend overlays
 * these rows on top of its static site-data fallback, so the site
 * keeps rendering even if these endpoints are unreachable.
 */
class SiteContentController extends Controller
{
    use ApiResponseTrait;

    public function services()
    {
        $services = Service::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get(['id', 'title', 'slug', 'short_description', 'long_description', 'image_path', 'icon', 'sort_order']);

        return $this->successResponse('services.fetched', $services);
    }

    public function industries()
    {
        $industries = Industry::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get(['id', 'title', 'slug', 'short_description', 'long_description', 'image_path', 'sort_order']);

        return $this->successResponse('industries.fetched', $industries);
    }

    public function pageSections()
    {
        $sections = PageSection::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get(['id', 'page_key', 'section_key', 'title', 'subtitle', 'content', 'image_path', 'json_data', 'sort_order']);

        return $this->successResponse('page-sections.fetched', $sections);
    }
}
