<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HomeApplianceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('auth')->group(function () {
    Route::post('send-otp', [AuthController::class, 'sendOtp']);
    Route::post('verify-otp', [AuthController::class, 'verifyOtp']);
    Route::post('register/send-otp', [AuthController::class, 'sendRegistrationOtp']);
    Route::post('register/verify-otp', [AuthController::class, 'verifyRegistrationOtp']);
    Route::post('login/send-otp', [AuthController::class, 'sendLoginOtp']);
    Route::post('login/verify-otp', [AuthController::class, 'verifyLoginOtp']);
    Route::post('resend-otp', [AuthController::class, 'resendOtp']);
    Route::get('user-types', [\App\Http\Controllers\Api\AuthMetaController::class, 'userTypes']);
});

// Public Pages & Contact
Route::get('pages/{slug}', [\App\Http\Controllers\Api\PageController::class, 'show']);
Route::post('contact', [\App\Http\Controllers\Api\PageController::class, 'submitContact'])
    ->middleware('throttle:10,1');

// Public Pickup Enquiry Submission (Schedule Pickup page — no auth).
// Creates a PickupQuery for admin review/negotiation; it does NOT create a
// PickupRequest directly. Admin converts it into a real PickupRequest later.
Route::post('pickup-queries', [\App\Http\Controllers\Api\PickupQuerySubmissionController::class, 'store'])
    ->middleware('throttle:6,1');

// Public Pickup Tracking (token-gated, no auth)
Route::get('track-pickup/{token}', [\App\Http\Controllers\Api\TrackPickupController::class, 'show'])
    ->middleware('throttle:30,1');

// Public Website Content
Route::get('testimonials', [\App\Http\Controllers\Api\TestimonialController::class, 'index']);
Route::get('scrap-rate', [\App\Http\Controllers\Api\ScrapRateController::class, 'index']);
Route::get('media', [\App\Http\Controllers\Api\MediaController::class, 'index']);
Route::post('testimonials', [\App\Http\Controllers\Api\TestimonialSubmissionController::class, 'store'])
    ->middleware('throttle:6,1');

// Locations & Slots
Route::get('serviceable-cities', [\App\Http\Controllers\Api\LocationController::class, 'serviceableCities']);
Route::get('pickup-slots', [\App\Http\Controllers\Api\LocationController::class, 'pickupSlots']);

// App Settings & Service Coverage
Route::match(['get', 'post'], 'app-settings', [\App\Http\Controllers\Api\AppSettingsController::class, 'index']);
Route::prefix('v1')->group(function () {
    Route::get('service-coverage', [\App\Http\Controllers\Api\ServiceCoverageController::class, 'index']);
    Route::post('waitlist', [\App\Http\Controllers\Api\WaitlistController::class, 'store']);
});

Route::middleware('auth:sanctum')->group(function () {
    // App Settings (Private)
    Route::post('app-settings/language', [\App\Http\Controllers\Api\AppSettingsController::class, 'updateLanguage']);

    // Help & Support (all authenticated roles)
    Route::post('help-support', [\App\Http\Controllers\Api\HelpSupportController::class, 'store']);
    Route::get('help-support', [\App\Http\Controllers\Api\HelpSupportController::class, 'index']);

    Route::prefix('auth')->group(function () {
        Route::get('profile', [AuthController::class, 'profile']);
        Route::post('logout', [AuthController::class, 'logout']);

        // Profile Enhancements
        Route::post('profile/update', [\App\Http\Controllers\Api\ProfileController::class, 'updateProfile']);
        Route::post('profile/bank-details', [\App\Http\Controllers\Api\ProfileController::class, 'updateBankDetails']);
        Route::delete('profile', [\App\Http\Controllers\Api\ProfileController::class, 'deleteAccount']);

        // Addresses and Payment Details CRUD
        Route::apiResource('profile/addresses', \App\Http\Controllers\Api\AddressController::class)->except(['show']);
        Route::apiResource('profile/payment-details', \App\Http\Controllers\Api\PaymentDetailController::class)->except(['show']);
    });

    // ============================================
    // Location APIs (States & Cities)
    // ============================================
    Route::get('states', [\App\Http\Controllers\Api\LocationController::class, 'states']);
    Route::get('cities', [\App\Http\Controllers\Api\LocationController::class, 'cities']);

    // ============================================
    // Screen: Home (Categories & Recent Orders)
    // ============================================
    Route::middleware(['role:customer'])->group(function () {
        Route::get('categories', [\App\Http\Controllers\Api\CategoryController::class, 'index']);
        Route::get('subcategories', [\App\Http\Controllers\Api\CategoryController::class, 'subcategories']);
        Route::get('categories/{id}', [\App\Http\Controllers\Api\CategoryController::class, 'show']);

        // Home Appliances Specialized Details
        Route::get('home-appliances/details', [HomeApplianceController::class, 'details']);
        Route::post('home-appliances/estimate', [HomeApplianceController::class, 'estimate']);

        // Recent Orders (reuse list endpoint)
        // Frontend can call: /api/pickup-requests?limit=5
    });

    // ============================================
    // Screen: My Pickups (History & Stats)
    // ============================================
    Route::middleware(['role:customer'])->group(function () {
        // Donation Requests
        Route::get('donation-products', [\App\Http\Controllers\Api\DonationRequestController::class, 'products']);
        Route::post('donation-request', [\App\Http\Controllers\Api\DonationRequestController::class, 'store']);
        Route::get('donation-requests', [\App\Http\Controllers\Api\DonationRequestController::class, 'index']);
        Route::get('donation-requests/{id}', [\App\Http\Controllers\Api\PickupRequestController::class, 'show']); // Reuse show logic
        Route::get('donation-requests/{id}/tracking', [\App\Http\Controllers\Api\PickupRequestController::class, 'tracking']); // Reuse tracking
        Route::post('pickup-requests/{id}/clone-as-donation', [\App\Http\Controllers\Api\DonationRequestController::class, 'cloneAsDonation']);

        Route::get('pickup-requests', [\App\Http\Controllers\Api\PickupRequestController::class, 'index']); // List with filters
        Route::get('pickup-requests/stats', [\App\Http\Controllers\Api\PickupRequestController::class, 'stats']); // New Stats Endpoint
        Route::get('pickup-requests/{id}', [\App\Http\Controllers\Api\PickupRequestController::class, 'show']);
        Route::get('pickup-requests/{id}/tracking', [\App\Http\Controllers\Api\PickupRequestController::class, 'tracking']);

        // Raising a Request
        Route::post('pickup-request', [\App\Http\Controllers\Api\PickupRequestController::class, 'store']);
        Route::post('pickup-requests', [\App\Http\Controllers\Api\PickupRequestController::class, 'store']);
        Route::post('pickup-requests/check-booking-eligibility', [\App\Http\Controllers\Api\PickupRequestController::class, 'checkBookingEligibility']);

        // Reschedule Pickup
        Route::post('pickup-requests/{id}/reschedule', [\App\Http\Controllers\Api\PickupRequestController::class, 'reschedule']);

        // Cancel Pickup
        Route::post('pickup-requests/{id}/cancel', [\App\Http\Controllers\Api\PickupRequestController::class, 'cancel']);
        Route::post('pickup-requests/{id}/review', [\App\Http\Controllers\Api\PickupRequestController::class, 'submitReview']);

        // Image Upload
        Route::post('pickup-images/upload', [\App\Http\Controllers\Api\ImageController::class, 'uploadPickupImages']);
        Route::get('pickup-requests/{id}/images', [\App\Http\Controllers\Api\ImageController::class, 'getPickupImages']);
        Route::delete('pickup-images/{id}', [\App\Http\Controllers\Api\ImageController::class, 'deleteImage']);
    });

    // ============================================
    // Notifications
    // ============================================
    Route::prefix('notifications')->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\NotificationController::class, 'index']);
        Route::get('/unread-count', [\App\Http\Controllers\Api\NotificationController::class, 'unreadCount']);
        Route::post('/{id}/read', [\App\Http\Controllers\Api\NotificationController::class, 'markAsRead']);
        Route::post('/read-all', [\App\Http\Controllers\Api\NotificationController::class, 'markAllAsRead']);
        Route::delete('/{id}', [\App\Http\Controllers\Api\NotificationController::class, 'destroy']);
        Route::post('/fcm-token', [\App\Http\Controllers\Api\NotificationController::class, 'updateFcmToken']);
    });

    // ============================================
    // REQUEST LIFECYCLE REFACTORING - NEW ROUTES
    // ============================================

    // Request CRUD (all authenticated users)
    Route::prefix('requests')->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\RequestController::class, 'index']);
        Route::post('/', [\App\Http\Controllers\Api\RequestController::class, 'store']);
        Route::get('/{id}', [\App\Http\Controllers\Api\RequestController::class, 'show']);
        Route::put('/{id}', [\App\Http\Controllers\Api\RequestController::class, 'update']);
        Route::post('/{id}/cancel', [\App\Http\Controllers\Api\RequestController::class, 'cancel']);
        Route::get('/{id}/status-history', [\App\Http\Controllers\Api\RequestController::class, 'statusHistory']);
        Route::get('/{id}/next-actions', [\App\Http\Controllers\Api\RequestController::class, 'getNextActions']);
    });

    // Payment Processing (Admin & Payment Admin Roles)
    Route::prefix('requests')->middleware('role:admin|payment_admin')->group(function () {
        Route::post('/{id}/payment/pending', [\App\Http\Controllers\Api\PaymentController::class, 'moveToPaymentPending']);
        Route::post('/{id}/payment/process', [\App\Http\Controllers\Api\PaymentController::class, 'processPayment']);
        Route::post('/{id}/payment/confirm', [\App\Http\Controllers\Api\PaymentController::class, 'confirmPayment']);
        Route::get('/{id}/payment', [\App\Http\Controllers\Api\PaymentController::class, 'getPaymentDetails']);
    });

    // Donation Requests
    Route::prefix('donations')->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\DonationController::class, 'index']);
        Route::post('/', [\App\Http\Controllers\Api\DonationController::class, 'store']);
        Route::get('/{id}', [\App\Http\Controllers\Api\DonationController::class, 'show']);
        Route::post('/{id}/cancel', [\App\Http\Controllers\Api\DonationController::class, 'cancel']);
    });

    Route::get('donations/statistics', [\App\Http\Controllers\Api\DonationController::class, 'statistics'])->middleware('role:admin');

    // ============================================
    // Admin Flow
    // ============================================
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        // Pickup price (admin override + logs)
        Route::put('pickups/{id}/final-price', [\App\Http\Controllers\Api\Admin\PickupPriceController::class, 'update']);
        Route::get('pickups/{id}/price-logs', [\App\Http\Controllers\Api\Admin\PickupPriceController::class, 'logs']);

        // User Types
        Route::patch('user-types/{code}/visibility', [\App\Http\Controllers\Api\Admin\AdminUserTypeController::class, 'updateVisibility']);

        Route::get('logs', [\App\Http\Controllers\Api\Admin\AdminController::class, 'logs']);
        Route::get('pickups', [\App\Http\Controllers\Api\Admin\AdminController::class, 'listPickups']);
        Route::get('pickups/{id}', [\App\Http\Controllers\Api\Admin\AdminController::class, 'getPickup']);
        Route::post('pickups/{id}/status', [\App\Http\Controllers\Api\Admin\AdminController::class, 'updatePickupStatus']);
        Route::get('pickups/{id}/tracking', [\App\Http\Controllers\Api\Admin\AdminController::class, 'getPickupTracking']);
        Route::get('pickups/{id}/reschedule-requests', [\App\Http\Controllers\Api\Admin\AdminController::class, 'getRescheduleRequests']);
        Route::post('pickups/{id}/approve-reschedule', [\App\Http\Controllers\Api\Admin\AdminController::class, 'approveReschedule']);
        Route::post('pickups/{id}/reject-reschedule', [\App\Http\Controllers\Api\Admin\AdminController::class, 'rejectReschedule']);
        Route::get('pickups/{id}/timeline', [\App\Http\Controllers\Api\Admin\AdminController::class, 'getPickupTimeline']);
        Route::get('pickups/{id}/verification', [\App\Http\Controllers\Api\Admin\AdminController::class, 'getVerificationAudit']);

        // Attributes
        Route::get('attributes', [\App\Http\Controllers\Api\Admin\AttributeController::class, 'index']);
        Route::post('attributes', [\App\Http\Controllers\Api\Admin\AttributeController::class, 'store']);
        Route::put('attributes/{id}', [\App\Http\Controllers\Api\Admin\AttributeController::class, 'update']);
        Route::delete('attributes/{id}', [\App\Http\Controllers\Api\Admin\AttributeController::class, 'destroy']);
        Route::post('attributes/{id}/assign', [\App\Http\Controllers\Api\Admin\AttributeController::class, 'assignToCategory']);

        // Waitlist Management
        Route::get('waitlist', [\App\Http\Controllers\Api\Admin\WaitlistManagementController::class, 'index']);
        Route::get('waitlist/export', [\App\Http\Controllers\Api\Admin\WaitlistManagementController::class, 'export']);
        Route::post('waitlist/{id}/status', [\App\Http\Controllers\Api\Admin\WaitlistManagementController::class, 'updateStatus']);
    });

    // Admin & Payment Admin Routes
    Route::prefix('admin')->middleware('role:admin|payment_admin')->group(function () {
        Route::get('payments', [\App\Http\Controllers\Api\Admin\AdminController::class, 'listPayments']);
        Route::get('payments/{id}', [\App\Http\Controllers\Api\Admin\AdminController::class, 'getPayment']);
        Route::post('payments/{id}/approve', [\App\Http\Controllers\Api\Admin\AdminController::class, 'approvePayment']);
    });

});
