import { Head, usePage } from "@inertiajs/react";
import { PageProps } from "@/types/props";
import { timeAgo, statusBadgeClass, initialsFormat, textSpace } from "@/lib/helper";

import Main from "@/layouts/main";
import { Dashboard } from "@/types/portal/dashboard";
import { Notification } from "@/components/notification";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { ClipboardCheck, ClipboardClock, ClockArrowUp, CopyCheck, Flag } from "lucide-react";

export default function Index({ values }: { values: Dashboard }){
    const { flash } = usePage<PageProps>().props;

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="Admin dashboard for Zentra app." />
            </Head>
            
            {flash.message && <div className="mb-3">
                <Notification status={flash.status} message={flash.message} />
            </div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent>
                        <p className="text-sm">TOTAL TASK</p>
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-semibold">{values.record.total_tasks}</p>
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
                            <p className="text-sm font-semibold">{values.record.pending_tasks}</p>
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
                            <p className="text-sm font-semibold">{values.record.in_progress_tasks}</p>
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
                            <p className="text-sm font-semibold">{values.record.completed_tasks}</p>
                            <div className="rounded-full border-1 border-green-500 bg-green-500 p-1">
                                <CopyCheck className="size-5 text-white"/>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">47 Last Month</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="p-0 mt-7">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[150px]"><b>Task Title</b></TableHead>
                            <TableHead className="min-w-[100px]"><b>Priority</b></TableHead>
                            <TableHead className="min-w-[150px]"><b>Assigned</b></TableHead>
                            <TableHead className="min-w-[100px]"><b>Status</b></TableHead>
                            <TableHead className="min-w-[140px]"><b>Created At</b></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {values?.record?.latest_tasks && values?.record?.latest_tasks.length > 0 ? ((values?.record?.latest_tasks.map)(task => (
                            <TableRow key={task.id}>
                                <TableCell>{task.name}</TableCell>
                                <TableCell>
                                    <Badge variant={statusBadgeClass(task.priority) as any}><Flag /> {task.priority}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={`${task.assigned.directory}/${task.assigned.filename}`} alt="@shadcn" />
                                            <AvatarFallback>{initialsFormat(task.assigned.name)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <small>{task.assigned.name}</small>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={statusBadgeClass(task.status) as any}> {textSpace(task.status)}</Badge>
                                </TableCell>
                                <TableCell>{timeAgo(task.created_at)}</TableCell>
                            </TableRow>
                        ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4">No Recent Task.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>  
        </Main>
    );
}