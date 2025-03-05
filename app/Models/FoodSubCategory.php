<?php

namespace App\Models;

use App\Traits\FileTrait;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FoodSubCategory extends Model
{
    use FileTrait;
    protected $fillable = [
        'food_category_id',
        'title',
        'image',
        'status',
    ];
    public function image(): Attribute
    {
        return $this->castingFile(defaultPath: 'foodSubCategory');
    }
    public function foodCategory(): BelongsTo
    {
        return $this->belongsTo(FoodCategory::class, 'food_category_id'); // Ensure foreign key is correct
    }
}
