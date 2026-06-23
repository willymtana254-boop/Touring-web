<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PageController extends Controller
{
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
        return Inertia::render('home');
    }

    public function about()
    {
        return Inertia::render('home');
    }

    public function contact()
    {
        return Inertia::render('home');
    }

    public function destination($slug)
    {
        return Inertia::render('home');
    }
}