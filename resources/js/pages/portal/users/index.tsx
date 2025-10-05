import { Head, Link } from "@inertiajs/react";
import { Users } from "@/types/portal/user";
import { create } from "@/routes/portal/users";

import Main from "@/layouts/main";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { MoreHorizontal, Search } from "lucide-react";

export default function Index({ values }: { values: Users }){
    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="List of user for Zentra app." />
            </Head>
            
            <Card className="p-0 gap-0">
                <div className="flex justify-between px-5 py-4">
                    <div className="flex flex-row gap-2">
                        <div className="relative w-[250px]">
                            <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                <Search className="size-4" />
                            </button>
                            <Input name="keyword" placeholder="Search" className="pl-9" />
                        </div>
                        <Select>
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Input name="start_date" type="date" placeholder="Search" className="w-[160px]"/>
                        <Input name="end_date" type="date" placeholder="Search" className="w-[160px]"/>
                        <Button>Search</Button>
                        <Button variant={"outline"}>Reset</Button>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Link href={create.url()}>
                            <Button>Add User</Button>
                        </Link>
                    </div>
                </div>

                <Separator/>
                
                <Table>
                    <TableHeader className="bg-gray-200">
                        <TableRow>
                            <TableHead className="min-w-[200px] pl-5"><b>Name</b></TableHead>
                            <TableHead className="min-w-[150px]"><b>Role</b></TableHead>
                            <TableHead className="min-w-[100px]"><b>Status</b></TableHead>
                            <TableHead className="min-w-[200px]"><b>Date Created</b></TableHead>
                            <TableHead className="min-w-[80px] text-center pr-5"><b>Action</b></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="pl-5">
                                <div className="flex gap-2 items-center">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <span className="text-blue-400">00002</span><br/>
                                        Juan Dela Cruz
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell>
                                <Badge variant="success">active</Badge>
                            </TableCell>
                            <TableCell>04/21/2025, 10:04 AM</TableCell>
                            <TableCell className="text-center pr-5">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View</DropdownMenuItem>
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem>Reset</DropdownMenuItem>
                                        <DropdownMenuItem>Deactivate</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Separator/>

                <Pagination className="py-2">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </Card>
        </Main>
    );
}