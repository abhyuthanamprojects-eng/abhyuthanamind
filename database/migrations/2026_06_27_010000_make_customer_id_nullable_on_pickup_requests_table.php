<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * customer_id was NOT NULL, which assumed every pickup request comes from
     * an authenticated app user. The public website's "Schedule Pickup" lead
     * form has no login, so it needs to create a PickupRequest without one.
     * doctrine/dbal isn't installed, so this uses a raw MODIFY instead of
     * Blueprint::change().
     */
    public function up(): void
    {
        DB::statement('ALTER TABLE pickup_requests MODIFY customer_id BIGINT UNSIGNED NULL');
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE pickup_requests MODIFY customer_id BIGINT UNSIGNED NOT NULL');
    }
};
