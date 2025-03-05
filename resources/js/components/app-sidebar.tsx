import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Cookie, Folder, LayoutGrid, ChevronDown, CookieIcon } from 'lucide-react';
import AppLogo from './app-logo';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: route('admin.dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Food ',
        url: '#',
        icon: Cookie,
        children: [
            { title: 'Categories', url: route('admin.food-category.index')},
            { title: 'Sub-Categories', url: route('admin.food-sub-category.index')},
            { title: 'Food Items', url: route('admin.food-item.index') },
        ],
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('admin.dashboard')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {mainNavItems.map((item, index) => (
                        <Collapsible key={index} defaultOpen={false}>
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        <item.icon className="mr-2" />
                                        {item.title}
                                        {item.children && <ChevronDown className="ml-auto" />}
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                            </SidebarMenuItem>
                            {item.children && (
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.children.map((subItem, subIndex) => (
                                            <SidebarMenuSubItem key={subIndex} className='text-sm'>
                                                <Link href={subItem.url}>{subItem.title}</Link>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            )}
                        </Collapsible>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
