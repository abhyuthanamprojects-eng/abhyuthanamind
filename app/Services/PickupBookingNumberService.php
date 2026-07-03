<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PickupBookingNumberService
{
    private const PREFIX = 'AIPL';
    private const TYPE = 'pickup_request';
    private const QUERY_TYPE = 'pickup_query';

    /**
     * Generate the next sequential booking ID for the current month, e.g.
     * AIPL-2606-001. Safe under concurrent requests via a row lock on
     * booking_sequences.
     */
    public static function next(): string
    {
        return self::nextForType(self::TYPE, sprintf('%s-%%s-%%03d', self::PREFIX));
    }

    /**
     * Generate the next sequential pickup query ID for the current month,
     * e.g. AIPL-Q-2606-001. Shares the same booking_sequences table under a
     * distinct `type` key so the two sequences never collide.
     */
    public static function nextQueryId(): string
    {
        return self::nextForType(self::QUERY_TYPE, sprintf('%s-Q-%%s-%%03d', self::PREFIX));
    }

    private static function nextForType(string $type, string $format): string
    {
        $period = now()->format('ym');

        return DB::transaction(function () use ($type, $format, $period) {
            $sequence = DB::table('booking_sequences')
                ->where('type', $type)
                ->where('period', $period)
                ->lockForUpdate()
                ->first();

            if ($sequence) {
                $nextNumber = $sequence->last_number + 1;
                DB::table('booking_sequences')
                    ->where('id', $sequence->id)
                    ->update(['last_number' => $nextNumber, 'updated_at' => now()]);
            } else {
                $nextNumber = 1;
                DB::table('booking_sequences')->insert([
                    'type' => $type,
                    'period' => $period,
                    'last_number' => $nextNumber,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            return sprintf($format, $period, $nextNumber);
        });
    }

    /**
     * Generate a hard-to-guess token for the public tracking link.
     */
    public static function generateTrackingToken(): string
    {
        return Str::random(48);
    }
}
