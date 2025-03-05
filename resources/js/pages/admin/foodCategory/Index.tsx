import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { FoodCategory } from '@/types/backend'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { SquarePen, Trash } from 'lucide-react'
import React, { useState } from 'react'

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
    foodCategories: FoodCategory[];

}
const Index = () => {
    const { foodCategories } = usePage<{ foodCategories: FoodCategory[] }>().props;
    const { data, setData, post, errors, reset } = useForm({
        title: '',
        image: null,
        status: '1'
    })


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post(route('admin.food-category.store'), {
            onSuccess: () => {
                reset()
                setOpen(false)
            }
        })
    }
    const deleteFoodCategory = (foodCategory: FoodCategory) => {
        if (!window.confirm('Are you sure you want to delete this category?')) {
            return;
        }
        
        router.delete(route('admin.food-category.destroy', foodCategory.id), {
            preserveScroll: true,
        });
    };

    const [open, setOpen] = useState(false);


    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Food Category" />
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4">
                    <div className='px-4'>
                        <div className='flex justify-between items-center mb-4'>
                            <h3 className='text-2xl font-semibold mb-1'>Food Category List</h3>
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <Button>Add New</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Category</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={onSubmit} encType="multipart/form-data">
                                        <div className="space-y-4">
                                            <div>
                                                <Label>Category Name</Label>
                                                <Input
                                                    name='title'
                                                    value={data.title}
                                                    onChange={(e) => setData('title', e.target.value)}
                                                    placeholder="Enter category name"
                                                    className='mt-1'
                                                />
                                                <InputError message={errors.title} className='mt-1' />
                                            </div>
                                            <div>
                                                <Label>Category Image</Label>
                                                <Input
                                                    type='file'
                                                    name='image'
                                                    onChange={(e) => setData('image', e.target.files[0])}
                                                    className='mt-1'
                                                />
                                                <InputError message={errors.image} className='mt-1' />
                                            </div>
                                        </div>
                                        <DialogFooter className="mt-4">
                                            <Button
                                                variant="outline"
                                                type="button"
                                                onClick={() => setOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button type='submit' className="bg-green-500 hover:bg-green-600 text-white">
                                                Save
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>

                        </div>

                        <Table>
                            <TableHeader className='bg-green-500 dark:bg-green-500 rounded-md'>
                                <TableRow>
                                    <TableHead className="text-white">S.No.</TableHead>
                                    <TableHead className="text-white">Name</TableHead>
                                    <TableHead className="text-white">Image</TableHead>
                                    <TableHead className="text-white">Status</TableHead>
                                    <TableHead className="text-center text-white">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {foodCategories.map((foodCategory, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell className="font-medium">{foodCategory.title}</TableCell>
                                        <TableCell>
                                            {foodCategory.image && (
                                                <img
                                                    src={foodCategory.image}
                                                    alt={foodCategory.title}
                                                    className="h-20 w-20 rounded-md object-cover"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => router.get(route('admin.food-category.updateStatus', foodCategory.id))}
                                                className={`${foodCategory.status === 1
                                                    ? 'bg-green-500 hover:bg-green-600'
                                                    : 'bg-red-500 hover:bg-red-600'
                                                    } text-white`}
                                            >
                                                {foodCategory.status === 1 ? 'Active' : 'Inactive'}
                                            </Button>
                                        </TableCell>
                                        <TableCell className='flex justify-center gap-2'>
                                            <Link
                                                href={route('admin.food-category.edit', foodCategory.id)}
                                                className="text-white bg-black dark:bg-white dark:text-black p-2 rounded-md w-8 h-8 flex items-center justify-center"
                                            >
                                                <SquarePen className='h-5 w-5' />
                                            </Link>
                                            <Button
                                                onClick={(e) => deleteFoodCategory(foodCategory)}
                                                variant="ghost"
                                                className="w-8 h-8 p-0 bg-black text-white dark:bg-white dark:text-black hover:bg-red-800 dark:hover:bg-red-700"
                                            >
                                                <Trash className='h-5 w-5' />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </AppLayout>
        </div>
    )
}

export default Index
