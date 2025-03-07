import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { FoodCategory, FoodItem, FoodSubCategory } from '@/types/backend'
import { Head, useForm, usePage } from '@inertiajs/react'
import React from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Food Category',
        href: route('admin.dashboard'),
    },
];

interface Props {
    foodItem: FoodItem;
}

const Edit = ({ foodItem }: Props) => {
    const { foodSubCategories } = usePage<{ foodSubCategories: FoodSubCategory[] }>().props;
    const { data, setData, post, errors, reset } = useForm({
        name: foodItem.name || '',
        food_sub_category_id: foodItem.food_sub_category_id || '',
        description: foodItem.description || '',
        price: foodItem.price || '',
        image: foodItem.image || null,
        _method: 'PUT',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.food-item.update', foodItem.id), {
            onSuccess: () => reset(),
            onError: () => console.log('Failed to update food item'), // Optional error handling
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Food Category" />

            <div className="w-full min-h-screen flex flex-col p-6">
                <h3 className="text-2xl font-semibold mb-6">Food Category Edit</h3>

                <div className="w-full bg-white rounded-lg p-6 border-2">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid grid-cols-2 gap-6">
                        <div>
                            <Label>Category Name</Label>
                            <Input
                                name="title"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter category name"
                                className="mt-1 w-full"
                            />
                            <InputError message={errors.name} className="mt-1 text-red-500" />
                        </div>

                        <div>
                            <Label>Main Category</Label>
                            <Select
                                name='food_sub_category_id'
                                value={data.food_sub_category_id.toString()}
                                onValueChange={(value) => setData('food_sub_category_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {foodSubCategories.map((subCategory) => (
                                        <SelectItem key={subCategory.id} value={subCategory.id.toString()}>
                                            {subCategory.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.food_sub_category_id} className='mt-1 text-red-500' />
                        </div>

                        <div>
                            <Label htmlFor="image">Food Image</Label>
                            <Input
                                id="image"
                                type="file"
                                name="image[]"
                                accept="image/*"
                                multiple
                                onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
                                className="mt-1"
                            />
                            <InputError message={errors.image} className='mt-1' />
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            {foodItem.image && foodItem.image.length > 0 && (
                                <div className="flex gap-4 flex-wrap justify-center">
                                    {foodItem.image.map((img, index) => (
                                        <div key={index} className="mb-4 w-32 h-32 border rounded-lg overflow-hidden">
                                            <img
                                                src={img}
                                                alt={`Food image ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>

                        <div className="flex justify-end col-span-2">
                            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Edit;
