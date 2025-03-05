<?php

namespace App\Models;

use App\Traits\FileTrait;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FoodCategory extends Model
{
    use SoftDeletes,FileTrait;

    protected $fillable = [
        'title',
        'image',
        'status',
    ];
    public function image(): Attribute
    {
        return $this->castingFile(defaultPath: 'foodCategory');
    }

}
