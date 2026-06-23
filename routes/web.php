<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PageController;

/*
|--------------------------------------------------------------------------
| Web Routes – Bahari Tours & Adventures
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return \Inertia\Inertia::render('home');
})->name('home');
// Public pages
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/destinations', [PageController::class, 'destinations'])->name('destinations');
Route::get('/destinations/{slug}', [PageController::class, 'destination'])->name('destination.show');
Route::get('/transport-fares', [PageController::class, 'transport'])->name('transport');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');

// Booking
Route::get('/book', [BookingController::class, 'create'])->name('booking.create');
Route::post('/book', [BookingController::class, 'store'])->name('booking.store');
Route::get('/book/confirmation/{reference}', [BookingController::class, 'confirmation'])->name('booking.confirmation');
