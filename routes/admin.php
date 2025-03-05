<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FoodCategoryController;
use App\Http\Controllers\Admin\FoodItemController;
use App\Http\Controllers\Admin\FoodSubCategory;
use App\Http\Controllers\Admin\FoodSubCategoryController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('food-category', FoodCategoryController::class,);
    Route::get('food-category/{foodCategory}/status', [FoodCategoryController::class, 'updateStatus'])
        ->name('food-category.updateStatus');

    Route::resource('food-item',FoodItemController::class);
    Route::get('food-item/{foodItem}/status', [FoodCategoryController::class, 'updateStatus'])
    ->name('food-item.updateStatus');

    Route::resource('food-sub-category',FoodSubCategoryController::class);
    Route::get('food-sub-category/{foodSubCategory}/status', [FoodSubCategoryController::class, 'updateStatus'])
    ->name('food-sub-category.updateStatus');
});
