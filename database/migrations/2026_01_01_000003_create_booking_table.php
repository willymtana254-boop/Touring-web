<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('reference', 20)->unique();        // e.g. BT-A3X9KL2M
            $table->string('name');
            $table->string('phone', 20);
            $table->string('email')->nullable();
            $table->string('from_location');
            $table->string('to_location');
            $table->date('travel_date');
            $table->enum('vehicle_type', ['saloon', 'van', '4wd'])->default('saloon');
            $table->unsignedSmallInteger('passengers')->default(1);
            $table->text('notes')->nullable();
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
            $table->decimal('quoted_price', 10, 2)->nullable();  // filled by admin
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
