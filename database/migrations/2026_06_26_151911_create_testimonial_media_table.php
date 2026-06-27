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
        Schema::create('testimonial_media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('testimonial_id')->constrained('testimonials')->cascadeOnDelete();
            $table->string('media_type', 20); // image, video, video_url
            $table->string('file_path')->nullable();
            $table->string('video_url')->nullable();
            $table->string('thumbnail_path')->nullable();
            $table->string('title')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['testimonial_id', 'sort_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonial_media');
    }
};
