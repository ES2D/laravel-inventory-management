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
        Schema::create('products', function (Blueprint $table) {

            $table->id();

            $table->foreignId('category_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->string('sku', 50)->unique();

            $table->string('barcode', 100)
                ->nullable()
                ->unique();

            $table->string('name', 150);

            $table->text('description')
                ->nullable();

            $table->string('unit', 20)
                ->default('Unidad');

            $table->decimal('purchase_price', 10, 2);

            $table->decimal('sale_price', 10, 2);

            $table->unsignedInteger('current_stock')
                ->default(0);

            $table->unsignedInteger('minimum_stock')
                ->default(5);

            $table->string('image')
                ->nullable();

            $table->boolean('is_active')
                ->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
