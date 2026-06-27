<?php

namespace App\Listeners;

use App\Events\RequestCreated;
use App\Models\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendRequestCreatedNotification implements ShouldQueue
{
    use InteractsWithQueue;

    public function handle(RequestCreated $event): void
    {
        $request = $event->request;

        // Send notification to customer
        Notification::create([
            'user_id' => $request->customer_id,
            'type' => 'request_created',
            'title' => 'Request Created Successfully',
            'message' => "Your {$request->request_type} request (#{$request->pickup_code}) has been created and is being processed.",
            'data' => [
                'request_id' => $request->id,
                'request_type' => $request->request_type,
                'pickup_code' => $request->pickup_code,
            ],
        ]);
    }
}
