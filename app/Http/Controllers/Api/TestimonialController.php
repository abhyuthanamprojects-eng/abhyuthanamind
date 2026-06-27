<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use App\Traits\ApiResponseTrait;

class TestimonialController extends Controller
{
    use ApiResponseTrait;

    public function index()
    {
        $testimonials = Testimonial::published()
            ->with('media:id,testimonial_id,media_type,file_path,video_url,sort_order')
            ->ordered()
            ->get([
                'id', 'customer_name', 'designation', 'company_name',
                'industry', 'city', 'rating', 'review_text', 'outcome_text',
                'outcome_label', 'image_path', 'video_url', 'is_featured',
            ]);

        return $this->successResponse('testimonials.fetched', $testimonials);
    }
}
