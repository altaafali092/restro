import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { FoodCategory, FoodSubCategory } from '@/types/backend'
import { Head, useForm, usePage } from '@inertiajs/react'
import React from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Food Sub Category',
        href: route('admin.food-sub-category.index'),
    },
];

interface Props {
    foodSubCategory: FoodSubCategory;
    foodCategories: FoodCategory[];
}

const Edit = ({ foodSubCategory, foodCategories }: Props) => {
    const { data, setData, post, errors, reset } = useForm({
        title: foodSubCategory.title || '',
        food_category_id: foodSubCategory.food_category_id?.toString() || '',
        image: null as File | null,
        _method: 'PUT',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.food-sub-category.update', foodSubCategory.id), {
            onSuccess: () => reset(),
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
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Enter category name"
                                className="mt-1 w-full"
                            />
                            <InputError message={errors.title} className="mt-1 text-red-500" />
                        </div>

                        <div>
                            <Label>Main Category</Label>
                            <Select
                                name='food_category_id'
                                value={data.food_category_id}
                                onValueChange={(value) => setData('food_category_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {foodCategories.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.food_category_id} className='mt-1 text-red-500' />
                        </div>

                        <div>
                            <Label>Category Image</Label>
                            <Input
                                type="file"
                                name="image"
                                onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                className="mt-1 w-full"
                            />
                            <InputError message={errors.image} className="mt-1 text-red-500" />
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            {foodSubCategory.image && (
                                <div className="mb-4 w-32 h-32 border rounded-lg overflow-hidden">
                                    <img
                                        src={foodSubCategory.image}
                                        alt={`${foodSubCategory.title} image`}
                                        className="w-full h-full object-cover"
                                    />
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
