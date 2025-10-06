import { Head, Link, usePage, useForm } from "@inertiajs/react";
import { Users } from "@/types/portal/user";
import { PageProps } from "@/types/props";
import { index, create, edit, show } from "@/routes/portal/users";
import { statusBadgeClass, dateTime } from "@/lib/helper";

import Main from "@/layouts/main";
import PagePagination from "@/components/page-paginate";
import { Notification } from "@/components/notification";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Search, FunnelX, Plus } from "lucide-react";

export default function Index({ values }: { values: Users }){
    const { flash } = usePage<PageProps>().props;
    
    const form = useForm({keyword: '',});

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();

        form.submit(index());
    }

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="List of user for Zentra app." />
            </Head>
            
            <Card className="p-0 gap-0">
                <h4 className="font-bold px-6 pt-5">All Users</h4>

                <form onSubmit={handleFilter}>
                    <div className="flex justify-between px-5 py-5 gap-2 overflow-x-auto">
                        <div className="flex flex-row gap-2">
                            <div className="w-[250px]">
                                <Input name="keyword" placeholder="Search for users" value={form.data.keyword} onChange={(e) => form.setData('keyword', e.target.value)}/>
                            </div>
                            <Button type="submit" variant={"secondary"}>
                                <Search className="size-4"/>
                            </Button>
                            <Link href={index.url()}>
                                <Button variant={"secondary"}>
                                    <FunnelX className="size-4"/>
                                </Button>
                            </Link>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Link href={create.url()}>
                                <Button>
                                <Plus className="size-4"/> Add User
                                </Button>
                            </Link>
                        </div>
                    </div>
                </form>

                {flash.message && <div className="px-5 mb-3">
                    <Notification status={flash.status} message={flash.message} />
                </div>}

                <Separator className="mt-2"/>

                <Table>
                    <TableHeader className="bg-orange-100">
                        <TableRow>
                            <TableHead className="min-w-[200px] pl-5"><b>Name</b></TableHead>
                            <TableHead className="min-w-[150px]"><b>Position</b></TableHead>
                            <TableHead className="min-w-[100px]"><b>Status</b></TableHead>
                            <TableHead className="min-w-[200px]"><b>Date Created</b></TableHead>
                            <TableHead className="min-w-[80px] text-center pr-5"><b>Action</b></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {values?.record?.data && values?.record?.data.length > 0 ? ((values?.record?.data.map)(user => (
                            <TableRow key={user.id}>
                                <TableCell className="pl-5">
                                    <div className="flex gap-2 items-center">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>{user.name}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <span className="text-blue-400">{user.name}</span><br/>
                                            <small>{user.email}</small>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>Admin</TableCell>
                                <TableCell>
                                    <Badge variant={statusBadgeClass(user.status) as any}>{user.status}</Badge>
                                </TableCell>
                                <TableCell>{dateTime(user.created_at)}</TableCell>
                                <TableCell className="text-center pr-5">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Link href={show(user.id)}>View</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href={edit(user.id)}>Edit</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>Reset</DropdownMenuItem>
                                            <DropdownMenuItem>Deactivate</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5}>No Record Found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <Separator/>

                <PagePagination links={values.record.links}/>
            </Card>
        </Main>
    );
}