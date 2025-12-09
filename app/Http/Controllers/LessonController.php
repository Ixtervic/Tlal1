<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\Module;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function store(Request $request, Module $module)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'slug' => 'nullable|string',
            'content_text' => 'nullable|string',
            'duration_seconds' => 'nullable|integer',
            'is_required' => 'boolean'
        ]);

        $position = $module->lessons()->count() + 1;

        $module->lessons()->create([
            ...$data,
            'position' => $position
        ]);

        return back();
    }

    public function update(Request $request, Lesson $lesson)
    {
        $lesson->update($request->only([
            'title',
            'slug',
            'content_text',
            'duration_seconds',
            'is_required'
        ]));

        return back();
    }

    public function destroy(Lesson $lesson)
    {
        $lesson->delete();
        return back();
    }
}

