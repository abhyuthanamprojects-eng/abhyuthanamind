<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

use App\Events\RequestCreated;
use App\Events\PickupCompleted;
use App\Events\PaymentPending;
use App\Events\PaymentCompleted;
use App\Events\DonationCompleted;

use App\Listeners\SendRequestCreatedNotification;
use App\Listeners\SendPickupCompletedNotification;
use App\Listeners\SendPaymentPendingNotification;
use App\Listeners\SendPaymentCompletedNotification;
use App\Listeners\SendDonationCompletedNotification;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        RequestCreated::class => [
            SendRequestCreatedNotification::class,
        ],
        PickupCompleted::class => [
            SendPickupCompletedNotification::class,
        ],
        PaymentPending::class => [
            SendPaymentPendingNotification::class,
        ],
        PaymentCompleted::class => [
            SendPaymentCompletedNotification::class,
        ],
        DonationCompleted::class => [
            SendDonationCompletedNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
