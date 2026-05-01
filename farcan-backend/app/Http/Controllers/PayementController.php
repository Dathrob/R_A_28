<?php

namespace App\Http\Controllers;

use App\Models\payement;
use Illuminate\Http\Request;

class PayementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            $request->validate([
                'course_id' => 'required|exists:courses,id',
                'amount' => 'required|numeric',
                'transaction_id' => 'required|string|max:255',
                'payment_method' => 'required|string|max:255',
                'status' => 'required|string',
            ]);
            $payement = payement::create($request->all());
            return response()->json($payement, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(payement $payement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(payement $payement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, payement $payement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(payement $payement)
    {
        //
    }
}
