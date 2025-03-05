<?php

namespace App\Http\Requests\FoodSubCategroy;

use Illuminate\Foundation\Http\FormRequest;

class StoreFoodSubCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'food_category_id'=>['required','exists:food_categories,id'],
            'title' => ['required','string','max:255'],
            'image' => ['required','image','mimes:jpeg,png,jpg','max:2048'],
            'status'=>['boolean','nullable']
        ];
    }
}
