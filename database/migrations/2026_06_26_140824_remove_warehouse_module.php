<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Removes the warehouse module and every table/column that references
     * `warehouses`. FK checks are disabled so the drops succeed on strict
     * engines (MySQL/InnoDB); guards keep it idempotent across engines.
     */
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        // Warehouse-only pivot table.
        Schema::dropIfExists('pickup_boy_warehouse');

        // assignments.warehouse_id
        if (Schema::hasColumn('assignments', 'warehouse_id')) {
            Schema::table('assignments', function (Blueprint $table) {
                try { $table->dropForeign(['warehouse_id']); } catch (\Throwable $e) {}
                $table->dropColumn('warehouse_id');
            });
        }

        // inventory_logs is entirely warehouse-dependent.
        Schema::dropIfExists('inventory_logs');

        // pickup_requests.warehouse_id
        if (Schema::hasColumn('pickup_requests', 'warehouse_id')) {
            Schema::table('pickup_requests', function (Blueprint $table) {
                try { $table->dropForeign(['warehouse_id']); } catch (\Throwable $e) {}
                $table->dropColumn('warehouse_id');
            });
        }

        // users.warehouse_id
        if (Schema::hasColumn('users', 'warehouse_id')) {
            Schema::table('users', function (Blueprint $table) {
                try { $table->dropForeign(['warehouse_id']); } catch (\Throwable $e) {}
                $table->dropColumn('warehouse_id');
            });
        }

        Schema::dropIfExists('warehouses');

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        throw new \RuntimeException('This migration is not reversible. Restore from storage/backups/ if needed.');
    }
};
