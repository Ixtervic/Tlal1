<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Http\Request;

class InstructorCourseController extends Controller
{
    public function index()
    {
        $courses = Course::where('user_id', Auth::id())->get();

        return Inertia::render('Instructor/Courses/Index', [
            'courses' => $courses,
        ]);
    }

    public function create()
    {
        $categories = Category::all(['id', 'name']);

        return Inertia::render('Instructor/Courses/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id',
            'level' => 'nullable|in:beginner,intermediate,advanced',
            'price' => 'nullable|numeric|min:0',
            'duration_minutes' => 'nullable|integer|min:1',
            'is_published' => 'nullable|boolean',
            'published_at' => 'nullable|date',
        ]);

        // Generate unique slug from title
        $slug = Str::slug($validated['title']);
        $originalSlug = $slug;
        $counter = 1;

        while (Course::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        $validated['slug'] = $slug;
        $validated['user_id'] = Auth::id();

        Course::create($validated);

        return redirect()->route('instructor.courses.index')
            ->with('success', 'Curso creado correctamente.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        //
    }

    public function destroy(Course $course)
    {
        //$this->authorize('delete', $course);
        $course->delete();

        return redirect()->back()->with('success', 'Curso eliminado correctamente.');
    }
}
