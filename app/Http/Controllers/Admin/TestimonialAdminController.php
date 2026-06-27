<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RejectTestimonialRequest;
use App\Http\Requests\StoreTestimonialRequest;
use App\Http\Requests\UpdateTestimonialRequest;
use App\Models\Testimonial;
use App\Models\TestimonialMedia;
use App\Services\MediaCompressionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TestimonialAdminController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['search', 'tab']);
        $tab = $filters['tab'] ?? 'all';

        $testimonials = Testimonial::query()
            ->withCount('media')
            ->when($filters['search'] ?? null, fn ($q, $v) => $q->where(function ($q2) use ($v) {
                $q2->where('customer_name', 'like', "%{$v}%")
                    ->orWhere('company_name', 'like', "%{$v}%");
            }))
            ->when($tab === 'pending', fn ($q) => $q->where('status', Testimonial::STATUS_PENDING))
            ->when($tab === 'approved', fn ($q) => $q->where('status', Testimonial::STATUS_APPROVED))
            ->when($tab === 'rejected', fn ($q) => $q->where('status', Testimonial::STATUS_REJECTED))
            ->ordered()
            ->paginate(15)
            ->withQueryString();

        $counts = [
            'all' => Testimonial::count(),
            'pending' => Testimonial::where('status', Testimonial::STATUS_PENDING)->count(),
            'approved' => Testimonial::where('status', Testimonial::STATUS_APPROVED)->count(),
            'rejected' => Testimonial::where('status', Testimonial::STATUS_REJECTED)->count(),
        ];

        return inertia('Admin/Testimonials/Index', [
            'testimonials' => $testimonials,
            'filters' => array_merge($filters, ['tab' => $tab]),
            'counts' => $counts,
            'submissionUrl' => route('testimonials.submit'),
        ]);
    }

    public function show(Testimonial $testimonial)
    {
        $testimonial->load(['media', 'approvedBy:id,name']);

        return inertia('Admin/Testimonials/Show', [
            'testimonial' => $testimonial,
        ]);
    }

    public function create()
    {
        return inertia('Admin/Testimonials/Form');
    }

    public function store(StoreTestimonialRequest $request)
    {
        $data = $request->validated();
        unset($data['media']);
        $data['is_active'] = $request->boolean('is_active', true);
        $data['is_featured'] = $request->boolean('is_featured', false);
        $data['consent_to_publish'] = $request->boolean('consent_to_publish', true);
        // Admin-authored testimonials are trusted and published immediately.
        $data['status'] = Testimonial::STATUS_APPROVED;
        $data['approved_at'] = now();
        $data['approved_by'] = $request->user()->id;

        if ($request->hasFile('media')) {
            $file = $request->file('media');
            $path = MediaCompressionService::store($file, 'testimonials');
            if (str_starts_with($file->getMimeType(), 'video/')) {
                $data['video_url'] = asset($path);
            } else {
                $data['image_path'] = $path;
            }
        }

        $maxOrder = Testimonial::max('sort_order');
        $data['sort_order'] = $data['sort_order'] ?? ($maxOrder === null ? 0 : $maxOrder + 1);

        Testimonial::create($data);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial created.');
    }

    public function edit(Testimonial $testimonial)
    {
        $testimonial->load('media');

        return inertia('Admin/Testimonials/Form', ['testimonial' => $testimonial]);
    }

    public function update(UpdateTestimonialRequest $request, Testimonial $testimonial)
    {
        $data = $request->validated();
        unset($data['media']);
        $data['is_active'] = $request->boolean('is_active', true);
        $data['is_featured'] = $request->boolean('is_featured', false);
        $data['consent_to_publish'] = $request->boolean('consent_to_publish', true);

        if ($request->hasFile('media')) {
            $file = $request->file('media');
            $isVideo = str_starts_with($file->getMimeType(), 'video/');

            if ($testimonial->image_path) {
                Storage::disk('public')->delete($testimonial->image_path);
            }
            if ($testimonial->video_url && str_starts_with($testimonial->video_url, asset(''))) {
                Storage::disk('public')->delete(ltrim(parse_url($testimonial->video_url, PHP_URL_PATH) ?? '', '/'));
            }

            $path = MediaCompressionService::store($file, 'testimonials');
            if ($isVideo) {
                $data['video_url'] = asset($path);
                $data['image_path'] = null;
            } else {
                $data['image_path'] = $path;
                $data['video_url'] = null;
            }
        }

        $testimonial->update($data);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial updated.');
    }

    public function approve(Request $request, Testimonial $testimonial)
    {
        $testimonial->approve($request->user()->id);

        return back()->with('success', 'Testimonial approved and published.');
    }

    public function reject(RejectTestimonialRequest $request, Testimonial $testimonial)
    {
        $testimonial->reject($request->validated('rejection_reason'));

        return back()->with('success', 'Testimonial rejected.');
    }

    public function feature(Testimonial $testimonial)
    {
        $testimonial->update(['is_featured' => !$testimonial->is_featured]);

        return back()->with('success', $testimonial->is_featured ? 'Marked as featured.' : 'Removed from featured.');
    }

    public function toggleStatus(Testimonial $testimonial)
    {
        $testimonial->update(['is_active' => !$testimonial->is_active]);

        return back()->with('success', $testimonial->is_active ? 'Published on website.' : 'Unpublished from website.');
    }

    public function destroyMedia(Testimonial $testimonial, TestimonialMedia $media)
    {
        abort_if($media->testimonial_id !== $testimonial->id, 404);

        if ($media->file_path) {
            Storage::disk('public')->delete($media->file_path);
        }
        $media->delete();

        return back()->with('success', 'Media removed.');
    }

    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->image_path) {
            Storage::disk('public')->delete($testimonial->image_path);
        }
        foreach ($testimonial->media as $media) {
            if ($media->file_path) {
                Storage::disk('public')->delete($media->file_path);
            }
        }
        $testimonial->delete();

        return back()->with('success', 'Testimonial deleted.');
    }
}
