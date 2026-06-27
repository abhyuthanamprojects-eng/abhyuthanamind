<?php

namespace App\Helpers;

class PhoneNumberHelper
{
    /**
     * Normalize a loosely-formatted Indian mobile number into a clean 10-digit
     * string, or null if it can't be normalized into a valid one.
     *
     * Accepts: "9876543210", "98765 43210", "98765-43210", "+91 9876543210",
     * "+91-9876543210", "91 9876543210", "(98765) 43210", etc.
     */
    public static function normalizeIndianMobile(?string $value): ?string
    {
        if (!$value) {
            return null;
        }

        $digits = preg_replace('/[^\d]/', '', $value);

        if (strlen($digits) === 12 && str_starts_with($digits, '91')) {
            $digits = substr($digits, 2);
        } elseif (strlen($digits) === 11 && str_starts_with($digits, '0')) {
            $digits = substr($digits, 1);
        }

        if (preg_match('/^[6-9]\d{9}$/', $digits)) {
            return $digits;
        }

        return null;
    }
}
