import { Head, Link, usePage, useForm, router } from "@inertiajs/react";
import { Users } from "@/types/portal/user";
import { PageProps } from "@/types/props";
import { index, create, edit, show, update_status, update_password, deleteMethod } from "@/routes/portal/users";
import { statusBadgeClass, boardDate, initialsFormat } from "@/lib/helper";

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

import { MoreHorizontal, Search, FunnelX, Plus } from "lucide-react";

export default function Index({ values }: { values: Users }){
    const { flash } = usePage<PageProps>().props;
    
    const form = useForm({keyword: values.keyword ?? '',});

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();

        form.submit(index());
    }

    const handleSPassword = (id: number) => {
        router.put(update_password.url(id));
    }

    const handleStatus = (id: number) => {
        router.put(update_status.url(id));
    }

    const handleDelete = (id: number) => {
        router.delete(deleteMethod.url(id));
    }

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="List of user for Zentra app." />
            </Head>

            <Card className="py-0 gap-0 px-6 mb-5">
                <CardTitle className="text-lg mt-5">Team Members</CardTitle>
                <CardDescription className="mt-2 mb-5">Manage user profiles, account settings, activate or deactivate accounts and control user permissions.</CardDescription>
            </Card>
            
            <Card className="p-0 gap-0">
                <h4 className="font-bold px-6 pt-5">All Members</h4>

                <form onSubmit={handleFilter}>
                    <div className="flex flex-col md:flex-row justify-between px-5 py-5 gap-2">
                        <div className="flex flex-row gap-2">
                            <div className="w-[250px]">
                                <Input name="keyword" placeholder="Search for member" value={form.data.keyword} onChange={(e) => form.setData('keyword', e.target.value)}/>
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
                                    Add Member
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
                                            <AvatarFallback>{initialsFormat(user.name)}</AvatarFallback>
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
                                <TableCell>{boardDate(user.created_at)}</TableCell>
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
                                                <Link href={show(user.id)}>View</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer" asChild>
                                                <Link href={edit(user.id)}>Edit</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer" asChild>
                                                <ConfirmDialog
                                                    triggerText="Reset"
                                                    title="Do want to reset user account password?"
                                                    description="Resetting this user’s password will immediately revoke their current credentials. The user will need to use the new password to log in."
                                                    confirmText="Reset Password"
                                                    onConfirm={() => handleSPassword(user.id)}
                                                    cancelText="Cancel"
                                                    variant="ghost"
                                                />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer" asChild>
                                                <ConfirmDialog
                                                    triggerText={user.status == "active" ? "Deactivate" : "Activate"}
                                                    title="Do want to update user account status?"
                                                    description="Changing the account status will affect the user's ability to access the system. You can update this again at any time."
                                                    confirmText={user.status == "active" ? "Deactivate" : "Activate"}
                                                    onConfirm={() => handleStatus(user.id)}
                                                    cancelText="Cancel"
                                                    variant="ghost"
                                                />
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer" asChild>
                                                 <ConfirmDialog
                                                    triggerText="Delete"
                                                    title="Do want to delete this user account?"
                                                    description="Deleting this user will permanently remove their account and all associated data. This action cannot be undone."
                                                    confirmText="Delete User"
                                                    onConfirm={() => handleDelete(user.id)}
                                                    cancelText="Cancel"
                                                    variant="ghost"
                                                    className="text-red-500"
                                                />
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4">No Record Found.</TableCell>
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