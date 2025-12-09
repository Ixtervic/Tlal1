<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::with(['user', 'category'])
            ->where('is_published', true)
            ->latest()
            ->get();

        return inertia('Student/Courses/Index', [
            'courses' => $courses,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        // Cargar relaciones necesarias
        $course->load(['user', 'category']);

        $is_enrolled = auth()->check() ? auth()->user()
            ->enrollments()
            ->where('course_id', $course->id)
            ->exists() : false;

        return inertia('Student/Courses/Show', [
            'course' => $course,
            'is_enrolled' => $is_enrolled,
        ]);
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        //
    }
}
