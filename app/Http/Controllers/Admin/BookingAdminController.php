<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingAdminController extends Controller
{
    public function index()
    {
        $bookings = Booking::latest()->get();

        return Inertia::render('admin/bookings', [
            'bookings' => $bookings,
        ]);
    }

    public function updateStatus(Request $request, Booking $booking)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $booking->update(['status' => $request->status]);

        return back()->with('success', 'Status updated.');
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();

        return back()->with('success', 'Booking deleted.');
    }

    public function export()
    {
        $bookings = Booking::latest()->get();

        $csv = "ID,Name,Phone,Email,From,To,Date,Vehicle,Passengers,Status,Created\n";

        foreach ($bookings as $b) {
            $csv .= implode(',', [
                $b->id,
                "\"{$b->full_name}\"",
                $b->phone,
                $b->email ?? '',
                "\"{$b->from_location}\"",
                "\"{$b->to_location}\"",
                $b->travel_date->format('Y-m-d'),
                $b->vehicle_type,
                $b->passengers,
                $b->status,
                $b->created_at->format('Y-m-d H:i'),
            ]) . "\n";
        }

        return response($csv, 200, [
            'Content-Type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename="bookings.csv"',
        ]);
    }
}