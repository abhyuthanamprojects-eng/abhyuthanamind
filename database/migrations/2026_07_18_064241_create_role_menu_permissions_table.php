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
        Schema::create('role_menu_permissions', function (Blueprint $table) {
            $table->id();
            $table->string('role_name'); // 'admin', 'manager', 'accountant'
            $table->string('menu_key'); // 'dashboard', 'pickup-queries', 'pickup-requests', etc.
            $table->boolean('can_access')->default(true);
            $table->boolean('can_edit')->default(false); // Optional: fine-grained control
            $table->timestamps();

            $table->unique(['role_name', 'menu_key']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_menu_permissions');
    }
};
