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
        Schema::table('users_permissions', function (Blueprint $table) {
            $table->string('description')->nullable()->after('guard_name');
            $table->string('module')->nullable()->after('description');
            $table->string('module_name')->nullable()->after('module');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users_permissions', function (Blueprint $table) {
            $table->dropColumn(['description', 'module', 'module_name']);
        });
    }
};
