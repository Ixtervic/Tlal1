<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $request, $searched = null)
    {
        $searched = $searched ?? $request->input('searched', '');

        // Búsqueda en campos existentes del modelo Course
        $courses = Course::with(['user', 'category'])
            ->where('is_published', true)
            ->where(function ($query) use ($searched) {
                $query->where('title', 'like', '%' . $searched . '%')
                      ->orWhere('short_description', 'like', '%' . $searched . '%')
                      ->orWhere('description', 'like', '%' . $searched . '%');
            })
            ->latest()
            ->get();

        return Inertia::render('Student/Searches/Search', [
            'searched' => $searched,
            'courses' => $courses,
        ]);
    }
}
