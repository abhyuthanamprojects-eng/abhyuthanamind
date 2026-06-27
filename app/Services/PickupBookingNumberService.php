<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PickupBookingNumberService
{
    private const PREFIX = 'AIPL';
    private const TYPE = 'pickup_request';

    /**
     * Generate the next sequential booking ID for the current month, e.g.
     * AIPL-2606-001. Safe under concurrent requests via a row lock on
     * booking_sequences.
     */
    public static function next(): string
    {
        $period = now()->format('ym');

        return DB::transaction(function () use ($period) {
            $sequence = DB::table('booking_sequences')
                ->where('type', self::TYPE)
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
                    'type' => self::TYPE,
                    'period' => $period,
                    'last_number' => $nextNumber,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            return sprintf('%s-%s-%03d', self::PREFIX, $period, $nextNumber);
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
