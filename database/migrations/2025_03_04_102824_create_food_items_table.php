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
        Schema::create('food_items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->foreignId('food_sub_category_id')->nullable()->constrained('food_sub_categories')->onDelete('cascade'); // Optional subcategory
            $table->string('price');
            $table->string('image')->nullable(); // Image path
            $table->boolean('is_available')->default(true);
            $table->boolean('status')->default(true);
            $table->softDeletes(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('food_items');
    }
};
