<?php

namespace App\Services;

use App\Models\AppSetting;

class ServiceabilityService
{
    public static function normalizePincode(?string $pincode): ?string
    {
        $digits = preg_replace('/\D+/', '', (string) $pincode);

        if (strlen($digits) < 6) {
            return null;
        }

        return substr($digits, 0, 6);
    }

    /**
     * Configured serviceable pincodes. An empty list means no restriction
     * is configured, so every pincode is treated as serviceable.
     */
    public static function serviceablePincodes(): array
    {
        return collect(AppSetting::get('serviceable_pincodes', []))
            ->map(fn ($pincode) => self::normalizePincode($pincode))
            ->filter()
            ->unique()
            ->values()
            ->all();
    }

    public static function isServiceable(?string $pincode): bool
    {
        $serviceablePincodes = self::serviceablePincodes();

        if (empty($serviceablePincodes)) {
            return true;
        }

        $normalized = self::normalizePincode($pincode);

        return $normalized && in_array($normalized, $serviceablePincodes, true);
    }
}
