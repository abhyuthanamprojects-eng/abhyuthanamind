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

// Channel Partner Registration
Route::get('register/partner', [\App\Http\Controllers\Auth\PartnerRegistrationController::class, 'create'])->name('partner.register');
Route::post('register/partner', [\App\Http\Controllers\Auth\PartnerRegistrationController::class, 'store']);
Route::get('register/partner/success', function() {
    return Inertia::render('Auth/PartnerRegisterSuccess');
})->name('partner.register.success');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class , 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class , 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class , 'destroy'])->name('profile.destroy');
});

// Admin Routes (Now Root)
// Shared Authenticated Routes
Route::middleware(['auth', 'role:admin|warehouse|channel_partner|pickup_boy|customer|payment_admin'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class , 'index'])->name('dashboard');
});

// Admin ONLY Routes
Route::middleware(['auth', 'role:admin'])->group(function () {
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
Route::middleware(['auth', 'role:admin|warehouse|channel_partner|pickup_boy|payment_admin'])->group(function () {
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
