<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        // Tabla de inscripciones de usuarios a cursos
        Schema::create('enrollments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->uuid('course_id');
            $table->timestamp('enrolled_at')->useCurrent();
            $table->decimal('progress_percent', 5, 2)->default(0);
            $table->enum('state', ['in_progress', 'completed', 'cancelled'])->default('in_progress');
            $table->timestamp('completed_at')->nullable();

            $table->timestamps();

            $table->unique(['user_id', 'course_id']);
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('course_id')->references('id')->on('courses');
        });

        // Tabla de progreso por lección
        Schema::create('progress_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('enrollment_id');
            $table->uuid('lesson_id');
            $table->boolean('is_completed')->default(false);
            $table->timestamp('completed_at')->nullable();
            $table->integer('attempts')->default(0);
            $table->timestamp('last_viewed_at')->nullable();

            $table->timestamps();

            $table->unique(['enrollment_id', 'lesson_id']);
            $table->foreign('enrollment_id')->references('id')->on('enrollments')->onDelete('cascade');
            $table->foreign('lesson_id')->references('id')->on('lessons');
        });
    }

    public function down(): void {
        Schema::dropIfExists('progress_items');
        Schema::dropIfExists('enrollments');
    }
};