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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->json('uploaded_documents');
            $table->string('selected_color');
            $table->string('selected_orientation');
            $table->string('selected_printing_mode');
            $table->integer('quantity');
            $table->decimal('price_per_page', 8, 2);
            $table->decimal('total_price', 8, 2);
            $table->string('payment_method');
            $table->string('payment_status');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
