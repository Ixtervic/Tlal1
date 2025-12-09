<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function store(Request $request, Course $course)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $position = $course->modules()->count() + 1;

        $course->modules()->create([
            ...$data,
            'position' => $position
        ]);

        return back();
    }

    public function update(Request $request, Module $module)
    {
        $module->update($request->only('title', 'description'));
        return back();
    }

    public function destroy(Module $module)
    {
        $module->delete();
        return back();
    }
}

