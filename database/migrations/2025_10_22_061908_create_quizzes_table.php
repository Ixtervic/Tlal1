<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('lesson_id');
            $table->string('title')->nullable();
            $table->json('settings')->nullable();
            $table->timestamps();

            $table->foreign('lesson_id')->references('id')->on('lessons');
        });
    }

    public function down(): void {
        Schema::dropIfExists('quizzes');
    }
};