import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import {  FoodItem, FoodSubCategory } from '@/types/backend'
import { Head, useForm, usePage } from '@inertiajs/react'
import { DialogTrigger } from '@radix-ui/react-dialog'

import React, { useState } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Food Items',
        href: route('admin.food-item.index'),
    },

];
interface Props {
    foodItems: FoodItem[];
    foodSubCategories: FoodSubCategory[];
}
const Index = () => {
    const { foodSubCategories,foodItems } = usePage<{ foodSubCategories: FoodSubCategory[], foodItems: FoodItem[] }>().props;
    const [open, setOpen] = useState(false);

    const{data,setData,errors,post}=useForm({
        name:'',
        food_sub_category_id:'',
        description:'',
        quantity:'',
        price:'',
        image: null,
    })

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Food Items" />
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4">
                    <div className='px-4'>
                        <div className='flex justify-between items-center mb-4'>
                            <h3 className='text-2xl font-semibold mb-1'>Food Sub Category Lists</h3>

                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <Button>Add New</Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl"> {/* Increased width */}
                                    <DialogHeader>
                                        <DialogTitle>Add New Category</DialogTitle>
                                    </DialogHeader>
                                    <form  encType="multipart/form-data">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Two-column layout */}
                                            <div>
                                                <Label>Category Name</Label>
                                                <Select
                                                    name='food_sub_category_id'
                                                    value={data.food_sub_category_id}
                                                    onValueChange={(value) => setData('food_sub_category_id', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {foodSubCategories.map((category) => (
                                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                                {category.title}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <InputError message={errors.food_sub_category_id} className='mt-1' />

                                            </div>
                                            <div>
                                                <Label>Food  Name</Label>
                                                <Input
                                                    name="name"
                                                    placeholder="Enter category name"
                                                    className="mt-1"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                />
                                                <InputError message={errors.name} className='mt-1' />
                                            </div>
                                            <div>
                                                <Label>Food price</Label>
                                                <Input
                                                type='number'
                                                    name="name"
                                                    placeholder="Enter category name"
                                                    className="mt-1"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                />
                                                <InputError message={errors.name} className='mt-1' />
                                            </div>
                                            <div>
                                                <Label>Category Image</Label>
                                                <Input type="file"
                                                    name='image'
                                                    onChange={(e) => setData('image', e.target.files[0])}
                                                    className="mt-1" />

                                                <InputError message={errors.image} className='mt-1' />
                                            </div>

                                        </div>
                                        <DialogFooter className="mt-6">
                                            <Button
                                                variant="outline"
                                                type="button"
                                                onClick={() => setOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
                                                Save
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>


                        </div>
                        {/* <Table>
                            <TableHeader className='bg-green-500 dark:bg-green-500 rounded-md'>
                                <TableRow>
                                    <TableHead className="text-white">S.No.</TableHead>
                                    <TableHead className="text-white">Name</TableHead>
                                    <TableHead className="text-white">Main Category</TableHead>
                                    <TableHead className="text-white">Image</TableHead>
                                    <TableHead className="text-white">Status</TableHead>
                                    <TableHead className="text-center text-white">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {foodSubCategories.map((foodSubCategory,index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell className="font-medium">{foodSubCategory.title}</TableCell>
                                        <TableCell className="font-medium">{foodSubCategory.food_category?.title}</TableCell>
                                        <TableCell>
                                            {foodSubCategory.image && (
                                                <img
                                                    src={foodSubCategory.image}
                                                    alt={foodSubCategory.title}
                                                    className="h-20 w-20 rounded-md object-cover"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => router.get(route('admin.food-sub-category.updateStatus', foodSubCategory.id))}
                                                className={`${foodSubCategory.status === 1
                                                    ? 'bg-green-500 hover:bg-green-600'
                                                    : 'bg-red-500 hover:bg-red-600'
                                                    } text-white`}
                                            >
                                                {foodSubCategory.status === 1 ? 'Active' : 'Inactive'}
                                            </Button>
                                        </TableCell>
                                        <TableCell className='flex justify-center gap-2'>
                                            <Link
                                                href={route('admin.food-sub-category.edit',foodSubCategory.id)}
                                                className="text-white bg-black dark:bg-white dark:text-black p-2 rounded-md w-8 h-8 flex items-center justify-center"
                                            >
                                                <SquarePen className='h-5 w-5' />
                                            </Link>
                                            <Button
                                                onClick={(e) => deleteFoodSubCategory(foodSubCategory)}
                                                variant="ghost"
                                                className="w-8 h-8 p-0 bg-black text-white dark:bg-white dark:text-black hover:bg-red-800 dark:hover:bg-red-700"
                                            >
                                                <Trash className='h-5 w-5' />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table> */}

                    </div>
                </div>
            </AppLayout>
        </div>
    )
}

export default Index
