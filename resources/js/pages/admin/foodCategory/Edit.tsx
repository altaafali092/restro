import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { FoodCategory } from '@/types/backend'
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
    foodCategory: FoodCategory;
}

const Edit = ({ foodCategory }: Props) => {
    const { foodCategories } = usePage<{ foodCategories: FoodCategory[] }>().props;
    const { data, setData, post, errors, reset } = useForm({
        title: foodCategory.title || '',
        image: null as File | null,
        _method: 'PUT',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.food-category.update', foodCategory.id), {
            onSuccess: () => reset(),
            onError: () => console.log('Failed to update category'), // Optional error handling
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Food Category" />
            <div className="flex flex-1 flex-col p-4">
                <div className='flex gap-1'>
                    <h3 className="text-2xl font-semibold mb-6">Food Category Edit</h3>
                </div>

                {/* Form with col-md-8 width */}
                <div className="w-full max-w-2xl bg-white rounded-lg p-6 border-2">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
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
                            {foodCategory.image && (
                                <div className="mb-4">
                                    <img
                                        src={foodCategory.image}
                                        alt={`${foodCategory.title} image`}
                                        className="w-20 h-20 object-cover"
                                    />
                                </div>
                            )}
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

                        <div className="flex justify-end">
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
