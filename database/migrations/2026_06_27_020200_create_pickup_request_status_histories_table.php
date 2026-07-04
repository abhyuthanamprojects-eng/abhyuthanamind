<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pickup_request_status_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pickup_request_id')->constrained('pickup_requests')->cascadeOnDelete();
            $table->string('status', 30);
            $table->text('note')->nullable();
            $table->foreignId('changed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['pickup_request_id', 'created_at'], 'prsh_request_created_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pickup_request_status_histories');
    }
};
