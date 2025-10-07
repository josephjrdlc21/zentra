import { logout } from "@/routes/portal/auth";
import { Link } from "@inertiajs/react";

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

    return(
        <div className="flex justify-between items-center gap-2">
            <div>
                <span className="hidden md:inline leading-tight">
                    Master Admin
                </span>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Master Admin <br/>
                        <small>master admin</small>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer">
                           <User2Icon/> Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <Lock/> Change Password
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