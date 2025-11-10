import { Head, Link, usePage, useForm } from "@inertiajs/react";
import { Reports } from "@/types/portal/report";
import { PageProps } from "@/types/props";
import { index, export_report } from "@/routes/portal/reports";
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

import { Search, FunnelX, Download } from "lucide-react";

export default function Index({ values }: { values: Reports }){
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
                <meta name="description" content="List of report for Zentra app." />
            </Head>

            <Card className="py-0 gap-0 px-6 mb-5">
                <CardTitle className="text-lg mt-5">Reports</CardTitle>
                <CardDescription className="mt-2 mb-5">Generate and review detailed reports on users, transactions, and system activities.</CardDescription>
            </Card>

            <Card className="p-0 gap-0">
                <h4 className="font-bold px-6 pt-5">All Reports</h4>

                <form onSubmit={handleFilter}>
                    <div className="flex flex-col md:flex-row justify-between px-5 py-5 gap-2">
                        <div className="flex flex-row gap-2">
                            <div className="w-[250px]">
                                <Input name="keyword" placeholder="Search for tasks, projects" value={form.data.keyword} onChange={(e) => form.setData('keyword', e.target.value)}/>
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
                            <Button variant="destructive" className={can('portal.reports.export', permissions) ? '' : 'hidden'} asChild>
                                <a
                                    href={export_report.url({
                                        query: { keyword: form.data.keyword },
                                    })}
                                    download
                                >
                                    <Download className="size-4" />
                                    Export
                                </a>
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
                            <TableHead className="min-w-[200px] pl-5"><b>Task</b></TableHead>
                            <TableHead className="min-w-[100px]"><b>Status</b></TableHead>
                            <TableHead className="min-w-[200px]"><b>Project</b></TableHead>
                            <TableHead className="min-w-[100px]"><b>Priority</b></TableHead>
                            <TableHead className="min-w-[100px]"><b>Assigned</b></TableHead>
                            <TableHead className="min-w-[200px]"><b>Due Date</b></TableHead>
                            <TableHead className="min-w-[200px] pr-5"><b>Date Created</b></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {values?.record?.data && values?.record?.data.length > 0 ? ((values?.record?.data.map)(task => (
                            <TableRow key={task.id}>
                                <TableCell className="pl-5">{task.name}</TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>{task.project.name}</TableCell>
                                <TableCell>{task.priority}</TableCell>
                                <TableCell>{task.assigned.name}</TableCell>
                                <TableCell>{boardDate(task.end_date)}</TableCell>
                                <TableCell className="pr-5">{boardDate(task.created_at)}</TableCell>
                            </TableRow>
                        ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-4">No Record Found.</TableCell>
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