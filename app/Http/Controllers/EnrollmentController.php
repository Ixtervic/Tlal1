<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $enrollments = Enrollment::with('course')
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Student/Enrollments/Index', [
            'enrollments' => $enrollments,
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
    public function store(Course $course)
    {
        // Evitar inscripciones duplicadas (la migración ya lo evita, pero igual)
        Enrollment::firstOrCreate(
            [
                'user_id'   => auth()->id(),
                'course_id' => $course->id,
            ],
            [
                'progress_percent' => 0,
                'state'            => 'in_progress',
                'enrolled_at'      => now(),
            ]
        );

        return redirect()->route('student.enrollments')
            ->with('success', 'Te has inscrito al curso correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Enrollment $enrollment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Enrollment $enrollment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Enrollment $enrollment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enrollment $enrollment)
    {
        //
    }
}
