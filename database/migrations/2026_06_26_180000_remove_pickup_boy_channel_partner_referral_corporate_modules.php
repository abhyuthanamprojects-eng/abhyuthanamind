<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Removes the Pickup Boy app, Referral system and Corporate Booking / KYC
     * modules — confirmed unused/never-built mobile features. The Channel
     * Partner cascade (channel_partners, channel_partner_customers,
     * approval_requests, and the FK columns on pickup_requests/users/
     * warehouses) was already dropped in an earlier run of this migration.
     *
     * referrals <-> referral_coupons have a circular FK, so both
     * constraints are dropped before either table is dropped.
     */
    public function up(): void
    {
        if (Schema::hasTable('referral_coupons') && Schema::hasTable('referrals')) {
            Schema::table('referral_coupons', function (Blueprint $table) {
                $table->dropForeign('referral_coupons_referral_id_foreign');
            });
            Schema::table('referrals', function (Blueprint $table) {
                $table->dropForeign('referrals_reward_coupon_id_foreign');
            });
        }

        Schema::dropIfExists('referrals');
        Schema::dropIfExists('referral_coupons');
        Schema::dropIfExists('referral_settings');

        Schema::dropIfExists('settlements');
        Schema::dropIfExists('withdrawals');

        Schema::dropIfExists('corporate_booking_estimates');
        Schema::dropIfExists('kyc_documents');

        Schema::dropIfExists('pickup_assignment_histories');
        Schema::dropIfExists('pickup_boy_locations');
        Schema::dropIfExists('pickup_boy_warehouse');
        Schema::dropIfExists('assignments');
    }

    /**
     * Intentionally irreversible — this is a deliberate module removal, not
     * a structural tweak. Restore from storage/backups/ if needed.
     */
    public function down(): void
    {
        throw new \RuntimeException('This migration is not reversible. Restore from storage/backups/ if needed.');
    }
};
