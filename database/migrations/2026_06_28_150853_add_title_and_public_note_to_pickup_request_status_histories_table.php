<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pickup_request_status_histories', function (Blueprint $table) {
            $table->string('title')->nullable()->after('status');
            $table->text('public_note')->nullable()->after('note');
        });
    }

    public function down(): void
    {
        Schema::table('pickup_request_status_histories', function (Blueprint $table) {
            $table->dropColumn(['title', 'public_note']);
        });
    }
};
