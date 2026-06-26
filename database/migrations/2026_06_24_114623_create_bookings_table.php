<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('bookings')) {
            Schema::create('bookings', function (Blueprint $table) {
                $table->id();
                $table->string('full_name');
                $table->string('phone');
                $table->string('email')->nullable();
                $table->string('from_location');
                $table->string('to_location');
                $table->date('travel_date');
                $table->enum('vehicle_type', ['saloon', 'van'])->default('saloon');
                $table->integer('passengers')->default(1);
                $table->text('notes')->nullable();
                $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};