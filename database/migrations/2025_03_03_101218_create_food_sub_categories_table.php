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
        Schema::create('food_sub_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('food_category_id')->constrained('food_categories')->onDelete('cascade');
            $table->string('title');
            $table->string('image')->nullable();
            $table->boolean('status')->defaultTrue();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('food_sub_categories');
    }
};
