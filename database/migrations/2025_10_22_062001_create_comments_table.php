<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        // Tabla de comentarios (polimórfica)
        Schema::create('comments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->nullable();
            $table->uuidMorphs('commentable');
            $table->text('body');
            $table->uuid('parent_id')->nullable();
            $table->boolean('is_public')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users');
        });

        // Tabla de calificaciones y reseñas
        Schema::create('ratings_reviews', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->uuid('course_id');
            $table->tinyInteger('rating')->checkBetween(1, 5);
            $table->text('review')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'course_id']);
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('course_id')->references('id')->on('courses');
        });
    }

    public function down(): void {
        Schema::dropIfExists('ratings_reviews');
        Schema::dropIfExists('comments');
    }
};