<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\Admin\BookingAdminController;
use App\Http\Controllers\PageController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes – Biryaa Travels & Adventures
|--------------------------------------------------------------------------
*/

// Home
Route::get('/', function () {
    return \Inertia\Inertia::render('home');
})->name('home');

// Public pages
Route::get('/destinations', [PageController::class, 'destinations'])->name('destinations');
Route::get('/destinations/{slug}', [PageController::class, 'destination'])->name('destination.show');
Route::get('/transport-fares', [PageController::class, 'transport'])->name('transport');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');

// Booking
Route::get('/book', [BookingController::class, 'create'])->name('booking.create');

// Admin panel (protected by auth)
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/bookings', [BookingAdminController::class, 'index'])->name('bookings.index');
    Route::patch('/bookings/{booking}/status', [BookingAdminController::class, 'updateStatus'])->name('bookings.status');
    Route::delete('/bookings/{booking}', [BookingAdminController::class, 'destroy'])->name('bookings.destroy');
    Route::get('/bookings/export', [BookingAdminController::class, 'export'])->name('bookings.export');
});
