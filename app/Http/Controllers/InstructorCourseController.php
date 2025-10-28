<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;

class InstructorCourseController extends Controller
{
    public function index()
    {
        $courses = Course::where('instructor_id', Auth::id())->get();

        return Inertia::render('Instructor/Courses/Index', [
            'courses' => $courses,
        ]);
    }

    public function create()
    {
        return Inertia::render('Instructor/Courses/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'price' => 'required|numeric|min:0',
        ]);

        $validated['instructor_id'] = Auth::id();

        Course::create($validated);

        return redirect()->route('instructor.courses.index')
            ->with('success', 'Curso creado correctamente.');
    }

    public function destroy(Course $course)
    {
        //$this->authorize('delete', $course);
        $course->delete();

        return redirect()->back()->with('success', 'Curso eliminado correctamente.');
    }
}
