<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PageController extends Controller
{
    public function about()
    {
        return Inertia::render('about');
    }

    public function home()
    {
        return Inertia::render('home');
    }

    public function destinations()
    {
        return Inertia::render('home');
    }

    public function transport()
    {
        return Inertia::render('transport');
    }

    public function contact()
    {
        return Inertia::render('contact');
    }

    public function destination($slug)
    {
        return Inertia::render('destination');
    }
}