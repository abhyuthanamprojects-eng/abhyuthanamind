<?php

namespace App\Console\Commands;

use App\Models\PickupRequest;
use App\Services\PickupBookingNumberService;
use Illuminate\Console\Command;

class GenerateMissingPickupBookingIds extends Command
{
    protected $signature = 'pickup-requests:generate-booking-ids';

    protected $description = 'Backfill booking_id and tracking_token for existing pickup requests that predate this feature';

    public function handle(): int
    {
        $missing = PickupRequest::whereNull('booking_id')->orWhereNull('tracking_token')->get();

        if ($missing->isEmpty()) {
            $this->info('No pickup requests are missing a booking ID or tracking token.');

            return self::SUCCESS;
        }

        $this->info("Backfilling {$missing->count()} pickup request(s)...");

        foreach ($missing as $pickup) {
            $pickup->forceFill([
                'booking_id' => $pickup->booking_id ?: PickupBookingNumberService::next(),
                'tracking_token' => $pickup->tracking_token ?: PickupBookingNumberService::generateTrackingToken(),
                'tracking_status' => $pickup->tracking_status ?: 'pending',
            ])->save();

            $this->line(" - #{$pickup->id} -> {$pickup->booking_id}");
        }

        $this->info('Done.');

        return self::SUCCESS;
    }
}
