<?php

namespace App\Notifications;

use App\Models\Testimonial;
use Illuminate\Notifications\Notification;

class NewTestimonialSubmitted extends Notification
{
    public function __construct(private Testimonial $testimonial)
    {
    }

    public function via($notifiable): array
    {
        return ['database'];
    }

    public function toDatabase($notifiable): array
    {
        return [
            'type' => 'testimonial_submitted',
            'title' => 'New testimonial submitted',
            'message' => "{$this->testimonial->customer_name} ({$this->testimonial->company_name}) submitted a testimonial for review.",
            'testimonial_id' => $this->testimonial->id,
        ];
    }
}
