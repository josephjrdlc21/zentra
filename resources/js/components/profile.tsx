import { logout } from "@/routes/portal/auth";
import { index, edit_password } from "@/routes/portal/profile";
import { Link, usePage } from "@inertiajs/react";
import { PageProps } from '@/types/props';
import { initialsFormat } from "@/lib/helper";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Lock, LogOut, User2Icon } from "lucide-react";

export default function Profile(){
    const { auth_portal } = usePage<PageProps>().props as any;

    return(
        <div className="flex justify-between items-center gap-2">
            <div>
                <span className="hidden md:inline leading-tight">
                    {auth_portal.name}
                </span>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={auth_portal.avatar} alt="@shadcn" />
                        <AvatarFallback>{initialsFormat(auth_portal.name)}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        {auth_portal.name} <br/>
                        <small>
                            {auth_portal.roles.length > 0
                            ? auth_portal.roles.map((role: { name: string }) => role.name).join(',')
                            : 'no roles'}
                        </small>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild className="cursor-pointer">
                           <Link href={index()}><User2Icon/> Profile </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href={edit_password()}><Lock/> Change Password </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href={logout()}><LogOut/>Logout</Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}