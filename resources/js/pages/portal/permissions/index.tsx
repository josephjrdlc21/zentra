import { Head, Link, usePage, useForm, router } from "@inertiajs/react";
import { index } from "@/routes/portal/permissions";
import { Permissions } from "@/types/portal/permission";
import { boardDate } from "@/lib/helper";

import Main from "@/layouts/main";
import PagePagination from "@/components/page-paginate";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Search, FunnelX } from "lucide-react";

export default function Index({ values }: { values: Permissions }){
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
                <CardTitle className="text-lg mt-5">Permissions</CardTitle>
                <CardDescription className="mt-2 mb-5">Displays the complete list of system permissions that define user access and capabilities.</CardDescription>
            </Card>

            <Card className="p-0 gap-0">
                <h4 className="font-bold px-6 pt-5">All Permissions</h4>

                <form onSubmit={handleFilter}>
                    <div className="flex flex-col md:flex-row justify-between px-5 py-5 gap-2">
                        <div className="flex flex-row gap-2">
                            <div className="w-[250px]">
                                <Input name="keyword" placeholder="Search for permission" value={form.data.keyword} onChange={(e) => form.setData('keyword', e.target.value)}/>
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
                            <TableHead className="min-w-[200px] pl-5"><b>Description</b></TableHead>
                            <TableHead className="min-w-[200px]"><b>Module</b></TableHead>
                            <TableHead className="min-w-[200px] pr-5"><b>Date Created</b></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {values?.record?.data && values?.record?.data.length > 0 ? ((values?.record?.data.map)(permission => (
                            <TableRow key={permission.id}>
                                <TableCell className="pl-5">{permission.description}</TableCell>
                                <TableCell>{permission.module_name}</TableCell>
                                <TableCell className="pr-5">{boardDate(permission.created_at)}</TableCell>
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
