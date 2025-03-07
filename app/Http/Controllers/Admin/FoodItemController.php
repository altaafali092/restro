<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FoodItem\StoreFoodItemRequest;
use App\Http\Requests\FoodItem\UpdateFoodItemRequest;
use App\Models\FoodItem;
use App\Models\FoodSubCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FoodItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $foodSubCategories = FoodSubCategory::where('status', 1)->latest()->get();
        $foodItems = FoodItem::with('foodSubCategory')->latest()->get();
        return Inertia::render('admin/FoodItem/Index',[
            'foodItems' =>fn()=> $foodItems,
            'foodSubCategories' => fn()=> $foodSubCategories,
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
    public function store(StoreFoodItemRequest $request)
    {
        FoodItem::create($request->validated());
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FoodItem $foodItem)
    {
        $foodSubCategories=FoodSubCategory::all();
        return Inertia::render('admin/FoodItem/Edit',[
            'foodItem' => fn() => $foodItem,
            'foodSubCategories' => fn() => $foodSubCategories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFoodItemRequest $request, FoodItem $foodItem)
    {
        $foodItem->update($request->validated());
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
