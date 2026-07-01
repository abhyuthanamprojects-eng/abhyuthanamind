<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pickup_queries', function (Blueprint $table) {
            $table->id();
            $table->string('query_id')->unique()->nullable();

            $table->string('customer_type');
            $table->string('full_name');
            $table->string('mobile_number');
            $table->string('email')->nullable();
            $table->string('company_name')->nullable();
            $table->string('city');
            $table->string('pickup_address', 500);
            $table->string('scrap_category');
            $table->string('selected_scrap_item')->nullable();
            $table->string('approximate_quantity')->nullable();
            $table->string('preferred_contact_method')->nullable();
            $table->date('preferred_pickup_date');
            $table->string('preferred_pickup_time');
            $table->text('description')->nullable();

            $table->text('negotiation_notes')->nullable();
            $table->decimal('quoted_amount', 12, 2)->nullable();
            $table->decimal('final_amount', 12, 2)->nullable();

            $table->enum('status', ['new', 'under_review', 'negotiation', 'accepted', 'rejected', 'converted'])
                ->default('new');

            $table->foreignId('converted_pickup_request_id')->nullable()
                ->constrained('pickup_requests')->nullOnDelete();
            $table->foreignId('created_by_admin')->nullable()
                ->constrained('users')->nullOnDelete();
            $table->foreignId('converted_by')->nullable()
                ->constrained('users')->nullOnDelete();
            $table->timestamp('converted_at')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pickup_queries');
    }
};
