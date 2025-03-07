export interface FoodCategory {
    id: string | number;
    title: string;
    image: string | null;  // Made image nullable as it might not always exist
    status: 0 | 1;
  }

  export interface FoodSubCategory {
    id: string | number;
    food_category_id: number;
    foodCategory: FoodCategory;
    title: string;
    image: string | null;  // Made image nullable as it might not always exist
    status: 0 | 1;
  }

  export interface FoodItem{
    id: string | number;
    food_sub_category_id: number;
    foodSubCategory: FoodSubCategory;
    name: string,
    price: number,
    description: string,
    image: string[] | null;
    status: 0|1;
    is_available: 0|1;
  }

