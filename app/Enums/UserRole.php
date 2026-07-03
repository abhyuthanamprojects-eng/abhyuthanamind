<?php

namespace App\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case PICKUP_BOY = 'pickup_boy';
    case CUSTOMER = 'customer';
    case CHANNEL_PARTNER = 'channel_partner';
    case PAYMENT_ADMIN = 'payment_admin';

    public function label(): string
    {
        return match ($this) {
            self::ADMIN => 'Administrator',
            self::PICKUP_BOY => 'Pickup Partner',
            self::CUSTOMER => 'Customer',
            self::CHANNEL_PARTNER => 'Channel Partner',
            self::PAYMENT_ADMIN => 'Payment Administrator',
        };
    }

    /**
     * Check if user can view all requests
     */
    public function canViewAllRequests(): bool
    {
        return self::ADMIN === $this;
    }

    /**
     * Check if user can process payments
     */
    public function canProcessPayments(): bool
    {
        return in_array($this, [self::ADMIN, self::PAYMENT_ADMIN]);
    }

    /**
     * Check if user can update pickup status
     */
    public function canUpdatePickupStatus(): bool
    {
        return in_array($this, [self::ADMIN, self::PICKUP_BOY]);
    }
}
