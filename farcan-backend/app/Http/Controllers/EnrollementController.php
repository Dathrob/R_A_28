<?php

namespace App\Http\Controllers;

use App\Models\Enrollement;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EnrollementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $enrollments = Enrollement::with(['user', 'course'])->orderBy('created_at', 'desc')->get();
        return response()->json($enrollments);
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
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'user_id' => 'required|exists:users,id',
        ]);

        // Check if the user is already enrolled in the course
        $existingEnrollment = Enrollement::where('user_id', $request->user_id)
            ->where('course_id', $request->course_id)
            ->first();

        if ($existingEnrollment) {
            return response()->json(['message' => 'You are already enrolled in this course.'], 400);
        }

       
        $enrollment = Enrollement::create([
            'user_id' => $request->user_id,
            'course_id' => $request->course_id,
            'status' => 'enrolled'
        ]);

        
        $certificate = \App\Models\Certification::create([
            'user_id' => $request->user_id,
            'course_id' => $request->course_id,
            'file_path' => '/certificates/cert_' . $enrollment->id . '_' . time() . '.pdf'
        ]);

      
        $enrollment->load(['course', 'user']);

        return response()->json([
            'enrollment' => $enrollment,
            'certificate' => $certificate
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Enrollement $enrollement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Enrollement $enrollement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Enrollement $enrollement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enrollement $enrollement)
    {
        //
    }
}
