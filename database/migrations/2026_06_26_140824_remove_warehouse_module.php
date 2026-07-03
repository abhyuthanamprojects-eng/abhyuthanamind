<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('inventory_logs', function (Blueprint $table) {
            $table->dropForeign('inventory_logs_warehouse_id_foreign');
        });
        Schema::table('pickup_requests', function (Blueprint $table) {
            $table->dropForeign('pickup_requests_warehouse_id_foreign');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('users_warehouse_id_foreign');
        });

        Schema::dropIfExists('inventory_logs');

        Schema::table('pickup_requests', function (Blueprint $table) {
            $table->dropColumn('warehouse_id');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('warehouse_id');
        });

        Schema::dropIfExists('warehouses');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        throw new \RuntimeException('This migration is not reversible. Restore from storage/backups/ if needed.');
    }
};
