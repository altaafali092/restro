<?php

namespace App\Http\Requests\FoodItem;

use Illuminate\Foundation\Http\FormRequest;

class StoreFoodItemRequest extends FormRequest
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
                'name' => ['required', 'string'],
                'description' => ['required', 'string'],
                'food_sub_category_id' => ['required', 'exists:food_sub_categories,id'],
                'price' => ['required', 'string'],
                'image' => ['required', 'array', 'min:1'],
                'image.*' => ['required', 'file'],
                'is_available' => ['nullable', 'boolean', 'default: true'],
                'status' => ['nullable', 'boolean', 'default:true']
            ];

    }
}
