<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            //$table->uuid('lesson_id');
            $table->foreignId('lesson_id')->nullable()->constrained('lessons')->onDelete('cascade');
            $table->string('title')->nullable();
            $table->json('settings')->nullable();
            $table->timestamps();

            //$table->foreign('lesson_id')->references('id')->on('lessons');
        });
    }

    public function down(): void {
        Schema::dropIfExists('quizzes');
    }
};