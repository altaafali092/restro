<?php

namespace App\Models;

use App\Traits\FileTrait;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class FoodItem extends Model
{
    use SoftDeletes, FileTrait;

    protected $fillable = [
        'name',
        'description',
        'food_sub_category_id',
        'price',
        'image',
        'is_available',
        'status',
    ];
    public function image(): Attribute
    {
        return $this->castingFile(defaultPath: 'foodItems');
    }
    public function foodSubCategory(): BelongsTo
    {
        return $this->belongsTo(FoodSubCategory::class);
    }

}
