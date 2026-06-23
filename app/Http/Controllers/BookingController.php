<?php

namespace App\Http\Controllers;

use App\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    /**
     * Transport pricing table (KSh, full vehicle, one-way).
     */
    public static array $fares = [
        ['from' => 'Mombasa',      'to' => 'Kilifi Town',          'saloon' => 4500,  'van' => 7000],
        ['from' => 'Mombasa',      'to' => 'Watamu / Malindi',     'saloon' => 7500,  'van' => 12000],
        ['from' => 'Mombasa',      'to' => 'Diani Beach (Kwale)',  'saloon' => 3500,  'van' => 5500],
        ['from' => 'Mombasa',      'to' => 'Lamu (via road)',      'saloon' => 18000, 'van' => 28000],
        ['from' => 'Mombasa',      'to' => 'Voi / Tsavo',         'saloon' => 9000,  'van' => 14500],
        ['from' => 'Kilifi',       'to' => 'Watamu / Malindi',     'saloon' => 4000,  'van' => 6500],
        ['from' => 'Kilifi',       'to' => 'Diani Beach (Kwale)',  'saloon' => 7500,  'van' => 12000],
        ['from' => 'Malindi',      'to' => 'Lamu (via road)',      'saloon' => 12000, 'van' => 19000],
        ['from' => 'Diani (Kwale)','to' => 'Taita Hills / Voi',   'saloon' => 11000, 'van' => 17000],
    ];

    public function create()
    {
        return view('booking.create', [
            'fares' => self::$fares,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:120',
            'phone'         => 'required|string|max:20',
            'email'         => 'nullable|email|max:120',
            'from_location' => 'required|string|max:120',
            'to_location'   => 'required|string|max:120',
            'travel_date'   => 'required|date|after_or_equal:today',
            'vehicle_type'  => 'required|in:saloon,van,4wd',
            'passengers'    => 'required|integer|min:1|max:14',
            'notes'         => 'nullable|string|max:500',
        ]);

        $reference = 'BT-' . strtoupper(Str::random(8));

        $booking = Booking::create([
            ...$validated,
            'reference' => $reference,
            'status'    => 'pending',
        ]);

        // TODO: Send WhatsApp/SMS notification to admin
        // TODO: Send confirmation SMS/email to guest

        return redirect()->route('booking.confirmation', $reference);
    }

    public function confirmation(string $reference)
    {
        $booking = Booking::where('reference', $reference)->firstOrFail();
        return view('booking.confirmation', compact('booking'));
    }
}
