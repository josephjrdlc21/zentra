import * as React from 'react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { VersionSwitcher } from '@/components/version-switcher';
import { 
    LayoutDashboard, 
    Users, 
    PanelsTopLeft, 
    ListTodo, 
    FileChartColumnIncreasing, 
    BookUser,
    UserCog,
    BrickWallShield,
    Logs,
} from 'lucide-react';

import { index as dashboard } from '@/routes/portal';
import { index as users } from '@/routes/portal/users';
import { index as projects } from '@/routes/portal/projects';

const data = {
    versions: ['1.0.1'],
    navMain: [
        {
            title: 'Navigation',
            url: '#',
            items: [
                {
                    title: 'Dashboard',
                    url: dashboard.url(),
                    icon: <LayoutDashboard className="size-4" />,
                    isActive: location.pathname === dashboard.url(),
                },
                {
                    title: 'Users',
                    url: users.url(),
                    icon: <Users className="size-4" />,
                    isActive: location.pathname.startsWith(users.url()),
                },
                {
                    title: 'Analytics',
                    url: '#',
                    icon: <FileChartColumnIncreasing className="size-4" />,
                },
                {
                    title: 'Activity Logs',
                    url: '#',
                    icon: <Logs className="size-4" />,
                },
            ],
        },
        {
            title: 'Task Management',
            url: '#',
            items: [
                {
                    title: 'Projects',
                    url: projects.url(),
                    icon: <PanelsTopLeft className="size-4" />,
                    isActive: location.pathname.startsWith(projects.url()),
                },
                {
                    title: 'Task',
                    url: '#',
                    icon: <ListTodo className="size-4" />,
                },
                {
                    title: 'Team Members',
                    url: '#',
                    icon: <BookUser className="size-4" />,
                },
            ]
        },
        {
            title: 'Settings',
            url: '#',
            items: [
                {
                    title: 'Roles',
                    url: '#',
                    icon: <UserCog className="size-4" />,
                },
                {
                    title: 'Permissions',
                    url: '#',
                    icon: <BrickWallShield className="size-4" />,
                },
            ]
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} />
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={item.isActive}>
                                            <a href={item.url} className="flex items-center gap-4">
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
