import { Head, Link } from "@inertiajs/react";
import { Task } from "@/types/portal/task";
import { board } from "@/routes/portal/tasks";
import { statusBadgeClass, dateOnly, initialsFormat, textSpace, boardDate, titleCase } from "@/lib/helper";

import Main from "@/layouts/main";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { Flag } from "lucide-react";

export default function Show({ values }: { values: Task }){

    console.log(values);
    
    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="Show task for Zentra app." />
            </Head>

            <div className="w-full flex justify-center">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg">Task details</CardTitle>
                        <CardDescription>Track and update all aspects of this task, from assignment to completion.</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <h2 className="text-lg font-semibold">{values.tasks.name}</h2>
                        <div className="flex gap-2 items-center mt-5">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>{initialsFormat(values.tasks.assigned.name)}</AvatarFallback>
                            </Avatar>
                            <div className="text-gray-500 dark:text-gray-200 ">
                                <span>{values.tasks.assigned.name}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="hidden md:block">
                                <p className="mt-5"><b>Timeline:</b></p>
                                <p className="mt-5"><b>Priority:</b></p>
                                <p className="mt-5"><b>Status:</b></p>
                                <p className="mt-5"><b>Project Type:</b></p>
                                <p className="mt-5"><b>Date Created:</b></p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-200 mt-5">{dateOnly(values.tasks.start_date)} - {dateOnly(values.tasks.end_date)}</p>
                                <Badge className="mt-5" variant={statusBadgeClass(values.tasks.priority) as any}><Flag /> {values.tasks.priority}</Badge><br/>
                                <Badge className="mt-5" variant={statusBadgeClass(values.tasks.status) as any}> {textSpace(values.tasks.status)}</Badge>
                                <p className="text-gray-500 dark:text-gray-200 mt-5">{values.tasks.project.name}</p>
                                <p className="text-gray-500 dark:text-gray-200 mt-5">{boardDate(values.tasks.created_at)}</p>
                            </div>
                        </div> 
                    </CardContent>

                    <Separator/>

                    <CardFooter className="flex justify-end gap-2">
                        <Button variant={"secondary"} asChild>
                            <Link href={board.url()}>
                                Go To Boards
                            </Link>
                        </Button>
                        <Button variant={"secondary"} asChild>
                            <Link href="#">
                                Edit
                            </Link>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <span className="sr-only">Open menu</span>
                                    {titleCase(values.tasks.status)}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Pending</DropdownMenuItem>
                                <DropdownMenuItem>In Progress</DropdownMenuItem>
                                <DropdownMenuItem>Completed</DropdownMenuItem>
                                <DropdownMenuItem>Cancelled</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardFooter>
                </Card>
            </div>
        </Main>
    );
}