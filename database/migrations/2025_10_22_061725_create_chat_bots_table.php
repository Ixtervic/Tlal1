<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('ai_integrations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('provider'); // ej. 'gemini'
            $table->text('api_key_encrypted');
            $table->string('default_model')->nullable();
            $table->json('settings')->nullable();
            $table->timestamps();
        });

        Schema::create('chat_sessions', function (Blueprint $table) {
            $table->id();
            //$table->uuid('user_id')->nullable();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            //$table->uuid('integration_id')->nullable();
            $table->foreignId('integration_id')->nullable()->constrained('ai_integrations')->onDelete('cascade');
            $table->timestamp('started_at')->useCurrent();
            $table->timestamp('ended_at')->nullable();
            $table->json('metadata')->nullable();

            //$table->foreign('user_id')->references('id')->on('users');
            //$table->foreign('integration_id')->references('id')->on('ai_integrations');
        });

        Schema::create('chat_messages', function (Blueprint $table) {
            $table->id();
            //$table->uuid('session_id');
            $table->foreignId('session_id')->nullable()->constrained('chat_sessions')->onDelete('cascade');
            $table->enum('sender', ['user', 'assistant', 'system']);
            $table->text('message');
            $table->json('metadata')->nullable();
            $table->timestamps();

            //$table->foreign('session_id')->references('id')->on('chat_sessions')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('chat_messages');
        Schema::dropIfExists('chat_sessions');
        Schema::dropIfExists('ai_integrations');
    }
};