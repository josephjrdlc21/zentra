import { Head, Link, usePage, useForm, router } from "@inertiajs/react";
import { Projects } from "@/types/portal/project";
import { PageProps } from "@/types/props";
import { index, create, edit, show, deleteMethod } from "@/routes/portal/projects";
import { statusBadgeClass, dateOnly, initialsFormat } from "@/lib/helper";
import { can } from "@/lib/permission";

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

export default function Index({ values }: { values: Projects }){
    const { flash, auth_portal } = usePage<PageProps>().props as any;
    const permissions = auth_portal?.permissions ?? [];
    
    const form = useForm({keyword: values.keyword ?? '',});

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();

        form.submit(index());
    }

    const handleDelete = (id: number) => {
        router.delete(deleteMethod.url(id));
    }

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="List of projects for Zentra app." />
            </Head>

            <Card className="py-0 gap-0 px-6 mb-5">
                <CardTitle className="text-lg mt-5">Project Management</CardTitle>
                <CardDescription className="mt-2 mb-5">Manage all your projects in one place — create, organize, and monitor progress while assigning team members and tracking deadlines efficiently.</CardDescription>
            </Card>

            <Card className="p-0 gap-0">
                <h4 className="font-bold px-6 pt-5">All Projects</h4>

                <form onSubmit={handleFilter}>
                    <div className="flex flex-col md:flex-row justify-between px-5 py-5 gap-2">
                        <div className="flex flex-row gap-2">
                            <div className="w-[250px]">
                                <Input name="keyword" placeholder="Search for projects" value={form.data.keyword} onChange={(e) => form.setData('keyword', e.target.value)}/>
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
                            <Button asChild className={can('portal.projects.create', permissions) ? '' : 'hidden'}>
                                <Link href={create.url()}>
                                    <Plus className="size-4"/>
                                    Add Project
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
                            <TableHead className="min-w-[200px] pl-5"><b>Project</b></TableHead>
                            <TableHead className="min-w-[100px]"><b>Status</b></TableHead>
                            <TableHead className="min-w-[200px]"><b>Members</b></TableHead>
                            <TableHead className="min-w-[250px]"><b>Start/Due Date</b></TableHead>
                            <TableHead className="min-w-[200px]"><b>Owner</b></TableHead>
                            <TableHead className="min-w-[80px] text-center pr-5"><b>Action</b></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {values?.record?.data && values?.record?.data.length > 0 ? ((values?.record?.data.map)(project => (
                            <TableRow key={project.id}>
                                <TableCell className="pl-5">
                                    <span className="text-blue-400">{project.name}</span><br/>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={statusBadgeClass(project.status) as any}>{project.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
                                        {project.members.slice(0, 5).map((member: any) => (
                                            <Avatar key={member.id}>
                                                <AvatarImage src={`${member.directory}/${member.filename}`} alt={member.name} />
                                                <AvatarFallback>{initialsFormat(member.name)}</AvatarFallback>
                                            </Avatar>
                                        ))}

                                        {project.members.length > 5 && (
                                            <Avatar key="extra">
                                                <AvatarFallback>
                                                    +{project.members.length - 5}
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {dateOnly(project.start_date)} - {dateOnly(project.due_date)}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2 items-center">
                                        <Avatar>
                                            <AvatarImage src={`${project.owner.directory}/${project.owner.filename}`} alt="@shadcn" />
                                            <AvatarFallback>{initialsFormat(project.owner.name) ?? 'N/A'}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <span>{project.owner.name ?? 'N/A'}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center pr-5">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem className={`cursor-pointer ${can('portal.projects.view', permissions) ? '' : 'hidden'}`} asChild>
                                                <Link href={show(project.id)}>View</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className={`cursor-pointer ${can('portal.projects.update', permissions) ? '' : 'hidden'}`} asChild>
                                                <Link href={edit(project.id)}>Edit</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className={`cursor-pointer text-red-500 ${can('portal.projects.delete', permissions) ? '' : 'hidden'}`} asChild>
                                                <ConfirmDialog
                                                    triggerText="Delete"
                                                    title="Do you want to delete this project?"
                                                    description="Deleting this project will permanently remove its tasks and all associated data. This action cannot be undone."
                                                    confirmText="Delete Project"
                                                    onConfirm={() => handleDelete(project.id)}
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
                                <TableCell colSpan={6} className="text-center py-4">No Record Found.</TableCell>
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