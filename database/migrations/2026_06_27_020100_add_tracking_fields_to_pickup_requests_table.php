<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Additive-only columns for the new manual admin status / customer
     * tracking-link feature. These are intentionally separate from the
     * existing `status` / `status_new` columns, which drive the authenticated
     * app's own pickup logistics lifecycle (RequestStatusTransitionService)
     * and must not be touched.
     */
    public function up(): void
    {
        Schema::table('pickup_requests', function (Blueprint $table) {
            $table->string('booking_id')->nullable()->unique()->after('pickup_code');
            $table->string('tracking_token', 64)->nullable()->unique()->after('booking_id');
            $table->string('tracking_status', 30)->default('pending')->after('tracking_token');
            $table->timestamp('tracking_status_updated_at')->nullable()->after('tracking_status');
            $table->text('admin_notes')->nullable()->after('tracking_status_updated_at');
            $table->text('public_notes')->nullable()->after('admin_notes');

            $table->index('tracking_status');
        });
    }

    public function down(): void
    {
        Schema::table('pickup_requests', function (Blueprint $table) {
            $table->dropColumn([
                'booking_id', 'tracking_token', 'tracking_status',
                'tracking_status_updated_at', 'admin_notes', 'public_notes',
            ]);
        });
    }
};
