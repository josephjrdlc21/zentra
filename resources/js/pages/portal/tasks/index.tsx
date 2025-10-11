import { Head, Link, usePage, useForm, router } from "@inertiajs/react";
import { Tasks } from "@/types/portal/task";
import { PageProps } from "@/types/props";
import { index, create } from "@/routes/portal/tasks";
import { statusBadgeClass, dateTime, initialsFormat } from "@/lib/helper";

import Main from "@/layouts/main";
import PagePagination from "@/components/page-paginate";
import ConfirmDialog from "@/components/confirmation";
import { Notification } from "@/components/notification";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Search, FunnelX, Plus, CircleDot, CircleEllipsis, CircleX, CircleCheck, Flag } from "lucide-react";

export default function Index({ values }: { values: Tasks }){
    const { flash } = usePage<PageProps>().props;
    
    const form = useForm({keyword: values.keyword ?? '',});

     return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="List of tasks for Zentra app." />
            </Head>

            <Card className="py-0 gap-0 px-6 mb-3">
                <CardTitle className="text-lg mt-5">Task Management</CardTitle>
                <CardDescription className="mt-2 mb-5">Browse and manage all task list. Monitor task pipelines to keep your projects on track.</CardDescription>
            </Card>

            <Card className="p-0 gap-0">
                <h4 className="font-bold px-6 pt-5">All Tasks</h4>

                <form>
                    <div className="flex flex-col md:flex-row justify-between px-5 py-5 gap-2">
                        <div className="flex flex-row gap-2">
                            <div className="w-[250px]">
                                <Input name="keyword" placeholder="Search for task" value={form.data.keyword} onChange={(e) => form.setData('keyword', e.target.value)}/>
                            </div>
                            <Button type="submit" variant={"secondary"}>
                                <Search className="size-4"/>
                            </Button>
                            <Button variant={"secondary"} asChild>
                                <Link href={index.url()}>
                                    <FunnelX className="size-4"/>
                                </Link>
                            </Button>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Button asChild>
                                <Link href={create.url()}>
                                    <Plus className="size-4"/>
                                    Add Task
                                </Link>
                            </Button>
                        </div>
                    </div>
                </form>

                {flash.message && <div className="px-5 mb-3">
                    <Notification status={flash.status} message={flash.message} />
                </div>}

                <Separator className="mt-2"/>

                <Table>
                    <TableHeader className="bg-orange-100 dark:bg-orange-800">
                        <TableRow>
                            <TableHead className="min-w-[200px] pl-5"><b>Name</b></TableHead>
                            <TableHead className="min-w-[100px]"><b>Priority</b></TableHead>
                            <TableHead className="min-w-[200px]"><b>Assigned</b></TableHead>
                            <TableHead className="min-w-[100px]"><b>Status</b></TableHead>
                            <TableHead className="min-w-[200px]"><b>Due Date</b></TableHead>
                            <TableHead className="min-w-[80px] text-center pr-5"><b>Action</b></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="pl-5">Solution Pages</TableCell>
                            <TableCell>
                                <Badge variant="warning"><Flag /> Medium</Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <small>Juan Dela Cruz</small>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="default"><CircleDot /> Pending</Badge>
                            </TableCell>
                            <TableCell>March 17 - 09:00 AM</TableCell>
                            <TableCell className="text-center pr-5">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem className="cursor-pointer" asChild>
                                            <Link href="#">View</Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </Main>
    );
}