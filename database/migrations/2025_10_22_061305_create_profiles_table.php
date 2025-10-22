<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();

            // Relación uno a uno con users
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');

            // Campos adicionales de usuario
            $table->boolean('is_verified')->default(false);
            $table->string('locale')->nullable();

            // Avatar (imagen de perfil)
            $table->foreignId('avatar_media_id')->nullable()->constrained('media')->onDelete('cascade');
            //$table->uuid('avatar_media_id')->nullable();
            //$table->foreign('avatar_media_id')->references('id')->on('media')->onDelete('set null');

            // Fechas
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void {
        Schema::dropIfExists('profiles');
    }
};
