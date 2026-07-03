<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pickup_requests', function (Blueprint $table) {
            $table->foreignId('pickup_query_id')->nullable()
                ->after('id')->constrained('pickup_queries')->nullOnDelete();

            $table->decimal('total_quantity', 12, 2)->nullable()->after('public_notes');
            $table->decimal('recycled_percentage', 5, 2)->nullable()->after('total_quantity');
            $table->decimal('refurbished_percentage', 5, 2)->nullable()->after('recycled_percentage');
            $table->decimal('disposed_percentage', 5, 2)->nullable()->after('refurbished_percentage');
            $table->decimal('recycled_quantity', 12, 2)->nullable()->after('disposed_percentage');
            $table->decimal('refurbished_quantity', 12, 2)->nullable()->after('recycled_quantity');
            $table->text('processing_notes')->nullable()->after('refurbished_quantity');
        });
    }

    public function down(): void
    {
        Schema::table('pickup_requests', function (Blueprint $table) {
            $table->dropConstrainedForeignId('pickup_query_id');
            $table->dropColumn([
                'total_quantity', 'recycled_percentage', 'refurbished_percentage',
                'disposed_percentage', 'recycled_quantity', 'refurbished_quantity', 'processing_notes',
            ]);
        });
    }
};
