<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FoodCategory\StoreFoodCategoryRequest;
use App\Http\Requests\FoodCategory\UpdateFoodCategoryRequest;
use App\Models\FoodCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use function App\Helpers\deleteFile;

class FoodCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $foodCategories = FoodCategory::latest()->get();

        return Inertia::render('admin/foodCategory/Index', [
            'foodCategories' => fn() => $foodCategories,
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
    public function store(StoreFoodCategoryRequest $request)
    {

        FoodCategory::create($request->validated());
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
    public function edit(FoodCategory $foodCategory)
     {
       
        return Inertia::render('admin/foodCategory/Edit', [
            'foodCategory' => fn() => $foodCategory,
        ]);
     }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFoodCategoryRequest $request, FoodCategory $foodCategory)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            // Delete the old image if a new one is uploaded
            if ($foodCategory->image) {
                deleteFile($foodCategory->getRawOriginal('image'));
            }
        } else {
            // Keep the old image if no new image is uploaded
            $data['image'] = $foodCategory->image;
        }

        $foodCategory->update($data);

        return to_route('admin.food-category.index')->with('success', 'Category updated successfully');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FoodCategory $foodCategory)
    {
        if ($foodCategory->image) {
            Storage::delete($foodCategory->image);
        }
        $foodCategory->delete();
        return back();
    }

    public function updateStatus(FoodCategory $foodCategory)
    {
        $foodCategory->update([
            'status' => !$foodCategory->status
        ]);
        return back();
    }
}
