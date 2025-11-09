import { Head, Link, usePage, useForm, router } from "@inertiajs/react";
import { PageProps } from "@/types/props";
import { index, create, edit } from "@/routes/portal/roles";
import { Roles } from "@/types/portal/role";
import { boardDate } from "@/lib/helper";
import { can } from "@/lib/permission";

import Main from "@/layouts/main";
import PagePagination from "@/components/page-paginate";
import { Notification } from "@/components/notification";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Search, FunnelX, Plus } from "lucide-react";

export default function Index({ values }: { values: Roles }){
    const { flash, auth_portal } = usePage<PageProps>().props as any;
    const permissions = auth_portal?.permissions ?? [];
        
    const form = useForm({keyword: values.keyword ?? '',});

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();

        form.submit(index());
    }

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="List of roles for Zentra app." />
            </Head>

            <Card className="py-0 gap-0 px-6 mb-3">
                <CardTitle className="text-lg mt-5">Roles</CardTitle>
                <CardDescription className="mt-2 mb-5">Manage user roles and their permissions. Assign access levels, modify privileges, and ensure proper authorization across your system.</CardDescription>
            </Card>

            <Card className="p-0 gap-0">
                <h4 className="font-bold px-6 pt-5">All Roles</h4>

                <form onSubmit={handleFilter}>
                    <div className="flex flex-col md:flex-row justify-between px-5 py-5 gap-2">
                        <div className="flex flex-row gap-2">
                            <div className="w-[250px]">
                                <Input name="keyword" placeholder="Search for roles" value={form.data.keyword} onChange={(e) => form.setData('keyword', e.target.value)}/>
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
                            <Button className={can('portal.roles.create', permissions) ? 'block' : 'hidden'} asChild>
                                <Link href={create.url()}>
                                    <Plus className="size-4"/>
                                    Add Role
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
                            <TableHead className="min-w-[150px] text-center"><b>Total Permissions</b></TableHead>
                            <TableHead className="min-w-[200px]"><b>Date Created</b></TableHead>
                            <TableHead className="min-w-[80px] text-center pr-5"><b>Action</b></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {values?.record?.data && values?.record?.data.length > 0 ? ((values?.record?.data.map)(role => (
                            <TableRow key={role.id}>
                                <TableCell className="pl-5">{role.name}</TableCell>
                                <TableCell className="text-center">{role.permissions_count}</TableCell>
                                <TableCell>{boardDate(role.created_at)}</TableCell>
                                <TableCell className="text-center pr-5">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem className={`cursor-pointer ${can('portal.roles.update', permissions) ? 'block' : 'hidden'}`} asChild>
                                                <Link href={edit(role.id)}>Edit</Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-4">No Record Found.</TableCell>
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