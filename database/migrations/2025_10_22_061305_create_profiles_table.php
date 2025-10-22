<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('profiles', function (Blueprint $table) {
            $table->uuid('id')->primary();

            // Relación uno a uno con users
            $table->uuid('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            // Campos adicionales de usuario
            $table->boolean('is_verified')->default(false);
            $table->string('locale')->nullable();

            // Avatar (imagen de perfil)
            $table->uuid('avatar_media_id')->nullable();
            $table->foreign('avatar_media_id')->references('id')->on('media')->onDelete('set null');

            // Fechas
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void {
        Schema::dropIfExists('profiles');
    }
};
