<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pickup_request_certificates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pickup_request_id')->unique()->constrained('pickup_requests')->cascadeOnDelete();
            $table->string('certificate_number')->nullable();
            $table->string('file_path');
            $table->date('issued_at')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pickup_request_certificates');
    }
};
