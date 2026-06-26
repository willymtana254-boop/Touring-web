<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'full_name',
        'phone',
        'email',
        'from_location',
        'to_location',
        'travel_date',
        'vehicle_type',
        'passengers',
        'notes',
        'status',
    ];

    protected $casts = [
        'travel_date' => 'date',
    ];
}