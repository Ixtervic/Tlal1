<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            //$table->uuid('author_id')->nullable();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            //$table->uuid('category_id')->nullable();
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('cascade');
            $table->enum('level', ['beginner', 'intermediate', 'advanced'])->default('beginner');
            $table->decimal('price', 10, 2)->default(0);
            $table->boolean('is_published')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->integer('duration_minutes')->nullable();
            //$table->uuid('thumbnail_media_id')->nullable();
            $table->foreignId('thumbnail_media_id')->nullable()->constrained('media')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();

            //$table->foreign('author_id')->references('id')->on('users');
            //$table->foreign('category_id')->references('id')->on('categories');
            //$table->foreign('thumbnail_media_id')->references('id')->on('media');
        });

        Schema::create('modules', function (Blueprint $table) {
            $table->id();
            //$table->uuid('course_id');
            $table->foreignId('course_id')->nullable()->constrained('courses')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->integer('position')->default(1);
            $table->timestamps();
            $table->softDeletes();

            //$table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
        });

        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            //$table->uuid('module_id');
            $table->foreignId('module_id')->nullable()->constrained('modules')->onDelete('cascade');
            $table->string('title');
            $table->string('slug')->nullable();
            $table->text('content_text')->nullable();
            $table->integer('duration_seconds')->nullable();
            $table->integer('position')->default(1);
            $table->boolean('is_required')->default(true);
            $table->timestamps();
            $table->softDeletes();

            //$table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('lessons');
        Schema::dropIfExists('modules');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('categories');
    }
};