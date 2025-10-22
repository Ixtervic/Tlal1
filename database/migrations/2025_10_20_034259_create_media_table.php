<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('provider_storage_path');
            $table->string('url');
            $table->enum('kind', ['image', 'video', 'pdf', 'audio', 'other']);
            $table->string('mime_type')->nullable();
            $table->bigInteger('size_bytes')->nullable();
            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
            $table->string('thumbnail_url')->nullable();
            $table->uuidMorphs('mediaable');
            $table->integer('order')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void {
        Schema::dropIfExists('media');
    }
};
