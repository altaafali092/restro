<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FoodSubCategroy\StoreFoodSubCategoryRequest;
use App\Http\Requests\FoodSubCategroy\UpdateFoodSubCategoryRequest;
use App\Models\FoodCategory;
use App\Models\FoodSubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use function App\Helpers\deleteFile;

class FoodSubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $foodSubCategories = FoodSubCategory::with('foodCategory')->latest()->get();
        $foodCategories = FoodCategory::where('status', 1)->latest()->get();
        return Inertia::render('admin/FoodSubCategory/Index', [
            'foodSubCategories' => fn() => $foodSubCategories,
            'foodCategories' => fn() => $foodCategories
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
    public function store(StoreFoodSubCategoryRequest $request)
    {

        FoodSubCategory::create($request->validated());
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
    public function edit(FoodSubCategory $foodSubCategory)
    {
        $foodCategories = FoodCategory::all();
        return Inertia::render('admin/FoodSubCategory/Edit', [
            'foodSubCategory' => fn() => $foodSubCategory,
            'foodCategories' => fn() => $foodCategories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFoodSubCategoryRequest $request, FoodSubCategory $foodSubCategory)
    {

        $data = $request->validated();

        if ($request->hasFile('image')) {
            // Delete the old image if a new one is uploaded
            if ($foodSubCategory->image) {
                deleteFile($foodSubCategory->getRawOriginal('image'));
            }
        } else {
            // Keep the old image if no new image is uploaded
            $data['image'] = $foodSubCategory->image;
        }

        $foodSubCategory->update($data);

        return to_route('admin.food-sub-category.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FoodSubCategory $foodSubCategory)
    {
        if ($foodSubCategory->image) {
            Storage::delete($foodSubCategory->image);
        }
        $foodSubCategory->delete();
        return back();
    }

    public function updateStatus(FoodSubCategory $foodSubCategory)
    {
        $foodSubCategory->update([
            'status' => !$foodSubCategory->status
        ]);
        return back();
    }
}
