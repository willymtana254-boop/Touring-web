<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function store(Request $request)
{
    $validated = $request->validate([
        'full_name'     => 'required|string|max:100',
        'phone'         => 'required|string|max:20',
        'email'         => 'nullable|email|max:100',
        'from_location' => 'required|string|max:100',
        'to_location'   => 'required|string|max:100',
        'travel_date'   => 'required|date|after_or_equal:today',
        'vehicle_type'  => 'required|in:saloon,van',
        'passengers'    => 'required|integer|min:1|max:14',
        'notes'         => 'nullable|string|max:500',
    ]);

    $reference = 'BT-' . strtoupper(Str::random(8));

    Booking::create([
        ...$validated,
        'reference' => $reference,
        'status'    => 'pending',
    ]);

    session(['booking_reference' => $reference, 'booking_data' => $validated]);

    return redirect()->route('booking.create');
}

public function create()
{
    $reference = session('booking_reference');
    $booking   = session('booking_data');

    session()->forget(['booking_reference', 'booking_data']);

    return Inertia::render('BookingPage', [
        'reference' => $reference,
        'confirmed' => (bool) $reference,
        'booking'   => $booking,
    ]);
}

public function confirmation(string $reference)
{
    $booking = \App\Models\Booking::where('reference', $reference)->firstOrFail();
    return Inertia::render('BookingConfirmation', ['booking' => $booking]);
}
}