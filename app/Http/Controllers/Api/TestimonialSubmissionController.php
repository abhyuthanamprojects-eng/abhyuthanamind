<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePublicTestimonialRequest;
use App\Models\Testimonial;
use App\Models\TestimonialMedia;
use App\Models\User;
use App\Notifications\NewTestimonialSubmitted;
use App\Services\MediaCompressionService;
use App\Traits\ApiResponseTrait;
use Illuminate\Support\Facades\DB;

class TestimonialSubmissionController extends Controller
{
    use ApiResponseTrait;

    public function store(StorePublicTestimonialRequest $request)
    {
        $data = $request->safe()->only([
            'customer_name', 'company_name', 'designation', 'city', 'industry',
            'rating', 'review_text', 'outcome_label', 'outcome_text', 'source',
        ]);

        DB::beginTransaction();

        try {
            $testimonial = Testimonial::create([
                ...$data,
                'status' => Testimonial::STATUS_PENDING,
                'is_active' => true,
                'is_featured' => false,
                'consent_to_publish' => $request->boolean('consent_to_publish'),
                'sort_order' => 0,
            ]);

            if ($request->hasFile('customer_photo')) {
                $testimonial->update([
                    'image_path' => MediaCompressionService::store($request->file('customer_photo'), 'testimonials/photos'),
                ]);
            }

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $i => $image) {
                    TestimonialMedia::create([
                        'testimonial_id' => $testimonial->id,
                        'media_type' => TestimonialMedia::TYPE_IMAGE,
                        'file_path' => MediaCompressionService::store($image, 'testimonials/media'),
                        'sort_order' => $i,
                    ]);
                }
            }

            if ($request->hasFile('video')) {
                TestimonialMedia::create([
                    'testimonial_id' => $testimonial->id,
                    'media_type' => TestimonialMedia::TYPE_VIDEO,
                    'file_path' => MediaCompressionService::store($request->file('video'), 'testimonials/videos'),
                ]);
            }

            if ($request->filled('video_url') && !$request->hasFile('video')) {
                TestimonialMedia::create([
                    'testimonial_id' => $testimonial->id,
                    'media_type' => TestimonialMedia::TYPE_VIDEO_URL,
                    'video_url' => $request->input('video_url'),
                ]);
            }

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();

            return $this->errorResponse('testimonials.submit_failed', 500, [
                'review_text' => ['Something went wrong submitting your feedback. Please try again.'],
            ]);
        }

        try {
            User::role('admin')->get()->each(fn (User $admin) => $admin->notify(new NewTestimonialSubmitted($testimonial)));
        } catch (\Throwable $e) {
            // Notifications are a courtesy, never block submission on them.
        }

        return $this->successResponse('testimonials.submitted', [
            'id' => $testimonial->id,
        ]);
    }
}
