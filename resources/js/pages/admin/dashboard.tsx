import DashboardTable from '@/components/DashboardTable';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BadgeIndianRupee, IndianRupee, IndianRupeeIcon, ShoppingBasket } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href:route('admin.dashboard'),
    },

];


export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-lg">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <div className='flex items-center justify-between px-5 py-4'>
                            <h2 className='text-2xl font-semibold text-gray-900 dark:text-white '>Total Revenue</h2>
                            <p className='text-xl font-medium text-gray-700 dark:text-gray-500 bg-amber-200 dark:bg-green-400 px-4 py-2 rounded-b-md'>
                                <IndianRupee />
                            </p>
                        </div>
                        <p className='mt-10 font-black text-gray-700 dark:text-white text-5xl text-center transition-all duration-300'>$45,231.89</p>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-lg">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <div className='flex items-center justify-between px-5 py-4'>
                            <h2 className='text-2xl font-semibold text-gray-900 dark:text-white '>Total Today's Order</h2>
                            <p className='text-xl font-medium text-gray-700 dark:text-gray-500 bg-amber-200 dark:bg-green-400 px-4 py-2 rounded-md'>
                                <ShoppingBasket />
                            </p>
                        </div>
                        <p className='mt-10 font-black text-gray-700 dark:text-white text-5xl text-center transition-all duration-300'>$45,231.89</p>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-lg">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <div className='flex items-center justify-between px-5 py-4'>
                            <h2 className='text-2xl font-semibold text-gray-900 dark:text-white '>Today's Revenue</h2>
                            <p className='text-xl font-medium text-gray-700 dark:text-gray-500 bg-amber-200 dark:bg-green-400 px-4 py-2 rounded-b-md'>
                                <BadgeIndianRupee />
                            </p>
                        </div>
                        <p className='mt-10 font-black text-gray-700 dark:text-white text-5xl text-center transition-all duration-300'>$45,231.89</p>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[400px] flex-1 rounded-xl border">
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    <div className='p-3'>
                        <DashboardTable />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[400px] flex-1 rounded-xl border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
