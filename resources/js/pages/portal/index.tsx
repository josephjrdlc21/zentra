import { Head, usePage } from "@inertiajs/react";
import { PageProps } from "@/types/props";

import Main from "@/layouts/main";
import { Dash } from "@/types/portal/main";

import { Card, CardDescription, CardTitle, CardContent } from "@/components/ui/card";

import { ClipboardCheck, ClipboardClock, ClockArrowUp, CopyCheck } from "lucide-react";

export default function Index({ values }: { values: Dash }){
    const { flash } = usePage<PageProps>().props;

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="Admin dashboard for Zentra app." />
            </Head>
            
            <Card className="py-0 gap-0 px-6 mb-5">
                <CardTitle className="text-lg mt-5">Dashboard</CardTitle>
                <CardDescription className="mt-2 mb-5">Monitor project progress, manage user accounts, and oversee tasks to ensure smooth team collaboration.</CardDescription>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent>
                        <p className="text-sm">TOTAL TASK</p>
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-semibold">90</p>
                            <div className="rounded-full border-1 border-cyan-500 bg-cyan-500 p-1">
                                <ClipboardCheck className="size-5 text-white"/>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">46 Last Month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <p className="text-sm">PENDING</p>
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-semibold">60</p>
                            <div className="rounded-full border-1 border-blue-500 bg-blue-500 p-1">
                                <ClipboardClock className="size-5 text-white"/>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">50 Last Month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <p className="text-sm">IN PROGRESS</p>
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-semibold">40</p>
                            <div className="rounded-full border-1 border-yellow-500 bg-yellow-500 p-1">
                                <ClockArrowUp className="size-5 text-white"/>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">54 Last Month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <p className="text-sm">COMPLETED</p>
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-semibold">20</p>
                            <div className="rounded-full border-1 border-green-500 bg-green-500 p-1">
                                <CopyCheck className="size-5 text-white"/>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">47 Last Month</p>
                    </CardContent>
                </Card>
            </div>
        </Main>
    );
}