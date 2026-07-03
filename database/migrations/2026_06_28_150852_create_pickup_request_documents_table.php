<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pickup_request_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pickup_request_id')->constrained()->cascadeOnDelete();
            $table->enum('document_type', ['form_6', 'form_2', 'green_certificate', 'other']);
            $table->string('document_number')->nullable();
            $table->string('file_path')->nullable();
            $table->json('generated_data')->nullable();
            $table->timestamp('issued_at')->nullable();
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->enum('status', ['draft', 'generated', 'uploaded', 'sent'])->default('draft');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['pickup_request_id', 'document_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pickup_request_documents');
    }
};
