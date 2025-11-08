import { Head, Link, useForm } from "@inertiajs/react";
import { index } from "@/routes/portal/audit-trails";
import { Audits } from "@/types/portal/audit";
import { boardDate } from "@/lib/helper";

import Main from "@/layouts/main";
import PagePagination from "@/components/page-paginate";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Search, FunnelX } from "lucide-react";

export default function Index({ values }: { values: Audits }){
    const form = useForm({keyword: values.keyword ?? '',});
    
    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();

        form.submit(index());
    }

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="List of permission for Zentra app." />
            </Head>

            <Card className="py-0 gap-0 px-6 mb-5">
                <CardTitle className="text-lg mt-5">Activity Logs</CardTitle>
                <CardDescription className="mt-2 mb-5">Displays a detailed record of user activities and system interactions for monitoring and auditing purposes.</CardDescription>
            </Card>

            <Card className="p-0 gap-0">
                <h4 className="font-bold px-6 pt-5">All Activity Logs</h4>

                <form onSubmit={handleFilter}>
                    <div className="flex flex-col md:flex-row justify-between px-5 py-5 gap-2">
                        <div className="flex flex-row gap-2">
                            <div className="w-[250px]">
                                <Input name="keyword" placeholder="Search for activity, user" value={form.data.keyword} onChange={(e) => form.setData('keyword', e.target.value)}/>
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
                        </div>
                    </div>
                </form>

                <Separator className="mt-2"/>

                <Table>
                    <TableHeader className="bg-orange-100 dark:bg-orange-800">
                        <TableRow>
                            <TableHead className="min-w-[200px] pl-5"><b>User</b></TableHead>
                            <TableHead className="min-w-[200px]"><b>Activity</b></TableHead>
                            <TableHead className="min-w-[200px] pr-5"><b>Action Date</b></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {values?.record?.data && values?.record?.data.length > 0 ? ((values?.record?.data.map)(activity => (
                            <TableRow key={activity.id}>
                                <TableCell className="pl-5">
                                    {activity.user?.name ?? 'System'} <br/>
                                    <small>{activity.ip}</small>
                                </TableCell>
                                <TableCell>{activity.remarks}</TableCell>
                                <TableCell className="pr-5">{boardDate(activity.created_at)}</TableCell>
                            </TableRow>
                        ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-4">No Record Found.</TableCell>
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
