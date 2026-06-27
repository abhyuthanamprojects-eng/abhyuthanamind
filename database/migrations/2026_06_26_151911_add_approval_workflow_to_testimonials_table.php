<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('testimonials', function (Blueprint $table) {
            $table->string('status', 20)->default('approved')->after('is_active');
            $table->boolean('is_featured')->default(false)->after('status');
            $table->boolean('consent_to_publish')->default(true)->after('is_featured');
            $table->string('outcome_label')->nullable()->after('outcome_text');
            $table->string('video_url')->nullable()->after('image_path');
            $table->string('source')->nullable()->after('video_url');
            $table->timestamp('approved_at')->nullable()->after('consent_to_publish');
            $table->foreignId('approved_by')->nullable()->after('approved_at')->constrained('users')->nullOnDelete();
            $table->text('rejection_reason')->nullable()->after('approved_by');

            $table->index('status');
        });

        // Backfill: existing rows are admin-curated demo content — treat as already approved.
        DB::table('testimonials')->update([
            'status' => 'approved',
            'consent_to_publish' => true,
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('testimonials', function (Blueprint $table) {
            $table->dropConstrainedForeignId('approved_by');
            $table->dropColumn([
                'status', 'is_featured', 'consent_to_publish', 'outcome_label',
                'video_url', 'source', 'approved_at', 'rejection_reason',
            ]);
        });
    }
};
