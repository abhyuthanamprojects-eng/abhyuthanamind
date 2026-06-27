<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return view('frontend');
});

// Static pages mapped to frontend React app
Route::get('/privacy', function () {
    return view('privacy');
});
Route::get('/support', function () {
    return Inertia::render('Support');
})->name('support');
Route::get('/termscondition', function () {
    return view('frontend');
});
Route::get('/partner', function () {
    return view('frontend');
});
Route::get('/contact', function () {
    return view('frontend');
});
Route::get('/terms', function () {
    return view('frontend');
});
Route::get('/cancellation', function () {
    return view('frontend');
});
Route::get('/about', function () {
    return view('frontend');
});
Route::get('/services/{serviceId}', function () {
    return view('frontend');
});
Route::get('/industries/{industryId}', function () {
    return view('frontend');
});
Route::get('/process', function () {
    return view('frontend');
});
Route::get('/scrap-rate', function () {
    return view('frontend');
});
Route::get('/schedule-pickup', function () {
    return view('frontend');
});

// Public Testimonial Submission (SPA shell — actual form lives in resources/js/Frontend)
Route::get('/submit-testimonial', function () {
    return view('frontend');
})->name('testimonials.submit');

// Public Pickup Tracking (SPA shell + token-gated download/certificate)
Route::get('/track-pickup/{token}', function () {
    return view('frontend');
})->name('track-pickup');
Route::get('/track-pickup/{token}/download', [\App\Http\Controllers\TrackPickupController::class, 'download'])
    ->middleware('throttle:20,1')
    ->name('track-pickup.download');
Route::get('/track-pickup/{token}/certificate', [\App\Http\Controllers\TrackPickupController::class, 'certificate'])
    ->middleware('throttle:20,1')
    ->name('track-pickup.certificate');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class , 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class , 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class , 'destroy'])->name('profile.destroy');
});

// Admin Routes (Now Root)
// Shared Authenticated Routes
Route::middleware(['auth', 'role:admin|customer|payment_admin'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class , 'index'])->name('dashboard');
});

// Admin ONLY Routes
// Prefixed with /admin so these never collide with public/{folder} upload
// directories (e.g. public/services, public/media) that PHP's dev server
// router resolves as static resources before reaching Laravel.
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::resource('pages', \App\Http\Controllers\Admin\PageController::class)->names('admin.pages');

    // Mobile App Management
    Route::get('app-settings', [\App\Http\Controllers\Admin\AppSettingsController::class, 'index'])->name('admin.app-settings.index');
    Route::post('app-settings', [\App\Http\Controllers\Admin\AppSettingsController::class, 'update'])->name('admin.app-settings.update');
    Route::post('home-banners', [\App\Http\Controllers\Admin\HomeBannerController::class, 'store'])->name('admin.home-banners.store');
    Route::post('home-banners/reorder', [\App\Http\Controllers\Admin\HomeBannerController::class, 'reorder'])->name('admin.home-banners.reorder');
    Route::match(['put', 'patch', 'post'], 'home-banners/{homeBanner}', [\App\Http\Controllers\Admin\HomeBannerController::class, 'update'])->name('admin.home-banners.update');
    Route::delete('home-banners/{homeBanner}', [\App\Http\Controllers\Admin\HomeBannerController::class, 'destroy'])->name('admin.home-banners.destroy');

    Route::get('help-support', [\App\Http\Controllers\Admin\HelpSupportController::class, 'index'])->name('admin.help-support.index');
    Route::get('help-support/{id}', [\App\Http\Controllers\Admin\HelpSupportController::class, 'show'])->name('admin.help-support.show');
    Route::post('help-support/{id}/status', [\App\Http\Controllers\Admin\HelpSupportController::class, 'updateStatus'])->name('admin.help-support.update-status');
    Route::delete('help-support/{id}', [\App\Http\Controllers\Admin\HelpSupportController::class, 'destroy'])->name('admin.help-support.destroy');

    // Pickup Requests — real backend, manual status workflow + certificates
    Route::get('pickup-requests', [\App\Http\Controllers\Admin\PickupRequestAdminController::class, 'index'])->name('admin.pickups.index');
    Route::get('pickup-requests/{pickupRequest}', [\App\Http\Controllers\Admin\PickupRequestAdminController::class, 'show'])->name('admin.pickups.show');
    Route::post('pickup-requests/{pickupRequest}/status', [\App\Http\Controllers\Admin\PickupRequestAdminController::class, 'updateStatus'])->name('admin.pickups.update-status');
    Route::post('pickup-requests/{pickupRequest}/certificate', [\App\Http\Controllers\Admin\PickupRequestAdminController::class, 'uploadCertificate'])->name('admin.pickups.certificate.upload');
    Route::delete('pickup-requests/{pickupRequest}/certificate', [\App\Http\Controllers\Admin\PickupRequestAdminController::class, 'destroyCertificate'])->name('admin.pickups.certificate.destroy');

    // Scrap Rate Management (categories + items) — real backend
    Route::get('scrap-rate-management', [\App\Http\Controllers\Admin\ScrapItemController::class, 'index'])->name('admin.scrap-rate.index');
    Route::get('scrap-items/create', [\App\Http\Controllers\Admin\ScrapItemController::class, 'create'])->name('admin.scrap-items.create');
    Route::post('scrap-items', [\App\Http\Controllers\Admin\ScrapItemController::class, 'store'])->name('admin.scrap-items.store');
    Route::get('scrap-items/{scrapItem}/edit', [\App\Http\Controllers\Admin\ScrapItemController::class, 'edit'])->name('admin.scrap-items.edit');
    Route::match(['put', 'post'], 'scrap-items/{scrapItem}', [\App\Http\Controllers\Admin\ScrapItemController::class, 'update'])->name('admin.scrap-items.update');
    Route::post('scrap-items/{scrapItem}/toggle-status', [\App\Http\Controllers\Admin\ScrapItemController::class, 'toggleStatus'])->name('admin.scrap-items.toggle-status');
    Route::delete('scrap-items/{scrapItem}', [\App\Http\Controllers\Admin\ScrapItemController::class, 'destroy'])->name('admin.scrap-items.destroy');

    Route::post('scrap-categories', [\App\Http\Controllers\Admin\ScrapCategoryController::class, 'store'])->name('admin.scrap-categories.store');
    Route::put('scrap-categories/{scrapCategory}', [\App\Http\Controllers\Admin\ScrapCategoryController::class, 'update'])->name('admin.scrap-categories.update');
    Route::delete('scrap-categories/{scrapCategory}', [\App\Http\Controllers\Admin\ScrapCategoryController::class, 'destroy'])->name('admin.scrap-categories.destroy');

    // Services — real backend
    Route::get('services', [\App\Http\Controllers\Admin\ServiceAdminController::class, 'index'])->name('admin.services.index');
    Route::get('services/create', [\App\Http\Controllers\Admin\ServiceAdminController::class, 'create'])->name('admin.services.create');
    Route::post('services', [\App\Http\Controllers\Admin\ServiceAdminController::class, 'store'])->name('admin.services.store');
    Route::get('services/{service}/edit', [\App\Http\Controllers\Admin\ServiceAdminController::class, 'edit'])->name('admin.services.edit');
    Route::match(['put', 'post'], 'services/{service}', [\App\Http\Controllers\Admin\ServiceAdminController::class, 'update'])->name('admin.services.update');
    Route::delete('services/{service}', [\App\Http\Controllers\Admin\ServiceAdminController::class, 'destroy'])->name('admin.services.destroy');

    // Industries — real backend
    Route::get('industries', [\App\Http\Controllers\Admin\IndustryAdminController::class, 'index'])->name('admin.industries.index');
    Route::get('industries/create', [\App\Http\Controllers\Admin\IndustryAdminController::class, 'create'])->name('admin.industries.create');
    Route::post('industries', [\App\Http\Controllers\Admin\IndustryAdminController::class, 'store'])->name('admin.industries.store');
    Route::get('industries/{industry}/edit', [\App\Http\Controllers\Admin\IndustryAdminController::class, 'edit'])->name('admin.industries.edit');
    Route::match(['put', 'post'], 'industries/{industry}', [\App\Http\Controllers\Admin\IndustryAdminController::class, 'update'])->name('admin.industries.update');
    Route::delete('industries/{industry}', [\App\Http\Controllers\Admin\IndustryAdminController::class, 'destroy'])->name('admin.industries.destroy');

    // Testimonials — real backend
    Route::get('testimonials', [\App\Http\Controllers\Admin\TestimonialAdminController::class, 'index'])->name('admin.testimonials.index');
    Route::get('testimonials/create', [\App\Http\Controllers\Admin\TestimonialAdminController::class, 'create'])->name('admin.testimonials.create');
    Route::post('testimonials', [\App\Http\Controllers\Admin\TestimonialAdminController::class, 'store'])->name('admin.testimonials.store');
    Route::get('testimonials/{testimonial}', [\App\Http\Controllers\Admin\TestimonialAdminController::class, 'show'])->name('admin.testimonials.show');
    Route::get('testimonials/{testimonial}/edit', [\App\Http\Controllers\Admin\TestimonialAdminController::class, 'edit'])->name('admin.testimonials.edit');
    Route::match(['put', 'post'], 'testimonials/{testimonial}', [\App\Http\Controllers\Admin\TestimonialAdminController::class, 'update'])->name('admin.testimonials.update');
    Route::post('testimonials/{testimonial}/approve', [\App\Http\Controllers\Admin\TestimonialAdminController::class, 'approve'])->name('admin.testimonials.approve');
    Route::post('testimonials/{testimonial}/reject', [\App\Http\Controllers\Admin\TestimonialAdminController::class, 'reject'])->name('admin.testimonials.reject');
    Route::post('testimonials/{testimonial}/feature', [\App\Http\Controllers\Admin\TestimonialAdminController::class, 'feature'])->name('admin.testimonials.feature');
    Route::post('testimonials/{testimonial}/toggle-status', [\App\Http\Controllers\Admin\TestimonialAdminController::class, 'toggleStatus'])->name('admin.testimonials.toggle-status');
    Route::delete('testimonials/{testimonial}/media/{media}', [\App\Http\Controllers\Admin\TestimonialAdminController::class, 'destroyMedia'])->name('admin.testimonials.media.destroy');
    Route::delete('testimonials/{testimonial}', [\App\Http\Controllers\Admin\TestimonialAdminController::class, 'destroy'])->name('admin.testimonials.destroy');

    // Certificates — real backend
    Route::get('certificates', [\App\Http\Controllers\Admin\CertificateAdminController::class, 'index'])->name('admin.certificates.index');
    Route::get('certificates/create', [\App\Http\Controllers\Admin\CertificateAdminController::class, 'create'])->name('admin.certificates.create');
    Route::post('certificates', [\App\Http\Controllers\Admin\CertificateAdminController::class, 'store'])->name('admin.certificates.store');
    Route::get('certificates/{certificate}/edit', [\App\Http\Controllers\Admin\CertificateAdminController::class, 'edit'])->name('admin.certificates.edit');
    Route::match(['put', 'post'], 'certificates/{certificate}', [\App\Http\Controllers\Admin\CertificateAdminController::class, 'update'])->name('admin.certificates.update');
    Route::delete('certificates/{certificate}', [\App\Http\Controllers\Admin\CertificateAdminController::class, 'destroy'])->name('admin.certificates.destroy');

    // Media / Gallery — real backend
    Route::get('media', [\App\Http\Controllers\Admin\MediaAdminController::class, 'index'])->name('admin.media.index');
    Route::post('media', [\App\Http\Controllers\Admin\MediaAdminController::class, 'store'])->name('admin.media.store');
    Route::match(['put', 'post'], 'media/{mediaItem}', [\App\Http\Controllers\Admin\MediaAdminController::class, 'update'])->name('admin.media.update');
    Route::delete('media/{mediaItem}', [\App\Http\Controllers\Admin\MediaAdminController::class, 'destroy'])->name('admin.media.destroy');

    // Page Sections (flexible CMS) — real backend
    Route::get('page-sections', [\App\Http\Controllers\Admin\PageSectionAdminController::class, 'index'])->name('admin.page-sections.index');
    Route::get('page-sections/create', [\App\Http\Controllers\Admin\PageSectionAdminController::class, 'create'])->name('admin.page-sections.create');
    Route::post('page-sections', [\App\Http\Controllers\Admin\PageSectionAdminController::class, 'store'])->name('admin.page-sections.store');
    Route::get('page-sections/{pageSection}/edit', [\App\Http\Controllers\Admin\PageSectionAdminController::class, 'edit'])->name('admin.page-sections.edit');
    Route::match(['put', 'post'], 'page-sections/{pageSection}', [\App\Http\Controllers\Admin\PageSectionAdminController::class, 'update'])->name('admin.page-sections.update');
    Route::delete('page-sections/{pageSection}', [\App\Http\Controllers\Admin\PageSectionAdminController::class, 'destroy'])->name('admin.page-sections.destroy');

    // Customers / Leads — read-only aggregate of contact enquiries + pickup leads
    Route::get('customers', [\App\Http\Controllers\Admin\CustomerLeadController::class, 'index'])->name('admin.customers.index');
    Route::get('reports', [\App\Http\Controllers\Admin\ReportController::class, 'index'])->name('admin.reports.index');

    // UI component reference pages (theme showcase)
    Route::inertia('theme/buttons', 'Admin/Theme/Buttons')->name('admin.theme.buttons');
    Route::inertia('theme/alerts', 'Admin/Theme/Alerts')->name('admin.theme.alerts');
    Route::inertia('theme/card', 'Admin/Theme/Card')->name('admin.theme.card');
    Route::inertia('theme/forms', 'Admin/Theme/Forms')->name('admin.theme.forms');
    Route::inertia('theme/typography', 'Admin/Theme/Typography')->name('admin.theme.typography');
    Route::inertia('theme/icons', 'Admin/Theme/Icons')->name('admin.theme.icons');
    Route::inertia('theme/sample-page', 'Admin/Theme/SamplePage')->name('admin.theme.sample-page');
});

// Contact Messages
Route::middleware(['auth', 'role:admin|payment_admin'])->group(function () {
    Route::get('contact-messages', [\App\Http\Controllers\Admin\ContactController::class, 'index'])->name('admin.contacts.index');
    Route::get('contact-messages/{contactMessage}', [\App\Http\Controllers\Admin\ContactController::class, 'show'])->name('admin.contacts.show');
    Route::patch('contact-messages/{contactMessage}/status', [\App\Http\Controllers\Admin\ContactController::class, 'updateStatus'])->name('admin.contacts.update-status');
    Route::delete('contact-messages/{contactMessage}', [\App\Http\Controllers\Admin\ContactController::class, 'destroy'])->name('admin.contacts.destroy');
});

// API Documentation
Route::get('/api/documentation', function () {
    return view('swagger');
});
 
require __DIR__ . '/auth.php';
