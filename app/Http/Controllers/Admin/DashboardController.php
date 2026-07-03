<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\ContactMessage;
use App\Models\MediaItem;
use App\Models\Page;
use App\Models\PickupRequest;
use App\Models\ScrapItem;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $canSeeUsers = $user->hasAnyRole(['admin', 'payment_admin']);

        $stats = [
            'users_count' => $canSeeUsers ? User::count() : null,
            'pickups_total' => PickupRequest::count(),
            'pickups_pending' => PickupRequest::where('tracking_status', 'pending')->count(),
            'pickups_completed' => PickupRequest::where('tracking_status', 'completed')->count(),
            'contact_queries' => ContactMessage::count(),
            'contact_queries_pending' => ContactMessage::where('status', 'pending')->count(),
            'pages_count' => Page::count(),
            'testimonials_pending' => Testimonial::where('status', Testimonial::STATUS_PENDING)->count(),
            'testimonials_approved' => Testimonial::where('status', Testimonial::STATUS_APPROVED)->count(),
        ];

        $contentHealth = [
            ['label' => 'Scrap Rate Items', 'route' => 'admin.scrap-rate.index', 'count' => ScrapItem::count(), 'active' => ScrapItem::where('is_active', true)->count()],
            ['label' => 'Active Services', 'route' => 'admin.services.index', 'count' => Service::count(), 'active' => Service::where('is_active', true)->count()],
            ['label' => 'Testimonials', 'route' => 'admin.testimonials.index', 'count' => Testimonial::count(), 'active' => Testimonial::where('status', Testimonial::STATUS_APPROVED)->count()],
            ['label' => 'Certificates', 'route' => 'admin.certificates.index', 'count' => Certificate::count(), 'active' => Certificate::where('is_active', true)->count()],
            ['label' => 'Media / Gallery', 'route' => 'admin.media.index', 'count' => MediaItem::count(), 'active' => MediaItem::where('is_active', true)->count()],
        ];

        $recentPickups = PickupRequest::with('city:id,name')
            ->latest()
            ->take(5)
            ->get(['id', 'booking_id', 'pickup_code', 'customer_name', 'customer_phone', 'city_id', 'tracking_status', 'scheduled_at', 'created_at']);

        $recentQueries = ContactMessage::latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'subject', 'status', 'created_at']);

        $recentTestimonials = Testimonial::latest()
            ->take(5)
            ->get(['id', 'customer_name', 'company_name', 'rating', 'status', 'created_at']);

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'contentHealth' => $contentHealth,
            'recentPickups' => $recentPickups,
            'recentQueries' => $recentQueries,
            'recentTestimonials' => $recentTestimonials,
            'testimonialSubmissionUrl' => route('testimonials.submit'),
        ]);
    }
}
