import { Head, Link } from "@inertiajs/react";
import { Project } from "@/types/portal/project";
import { index, edit } from "@/routes/portal/projects";
import { statusBadgeClass, dateOnly, initialsFormat, boardDate } from "@/lib/helper";

import Main from "@/layouts/main";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function Show({ values }: { values: Project }){

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="Show project for Zentra app." />
            </Head>

            <div className="w-full flex justify-center">
                
                <Card className="w-full max-w-4xl">
                    <CardHeader>
                        <CardTitle className="text-lg">Project details</CardTitle>
                        <CardDescription>Review the project’s overview, adjust its settings, and manage assigned members.</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col md:flex-row mt-2 gap-5 md:gap-10">
                            <div className="text-sm">
                                <div className="flex flex-col md:flex-row gap-3">
                                    <p><b>Project:</b></p>
                                    <p className="text-gray-500 dark:text-gray-200">{values.project.name}</p>
                                </div>
                                    <div className="flex flex-col md:flex-row gap-3 mt-5">
                                    <p><b>Start Date:</b></p>
                                    <p className="text-gray-500 dark:text-gray-200">{dateOnly(values.project.start_date)}</p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-3 mt-5 md:items-center">
                                    <p><b>Owner:</b></p>
                                    <div className="flex gap-2 items-center">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>{initialsFormat(values.project.owner.name)}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-gray-500 dark:text-gray-200">
                                            <span>{values.project.owner.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-sm">
                                <div className="flex flex-col md:flex-row gap-3">
                                    <p><b>Status:</b></p>
                                    <Badge variant={statusBadgeClass(values.project.status) as any}>{values.project.status}</Badge>
                                </div>
                                <div className="flex flex-col md:flex-row gap-3 mt-5">
                                    <p><b>Due Date:</b></p>
                                    <p className="text-gray-500 dark:text-gray-200">{dateOnly(values.project.due_date)}</p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-3 mt-6">
                                    <p><b>Created:</b></p>
                                    <p className="text-gray-500 dark:text-gray-200">{boardDate(values.project.created_at)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-sm mt-10">
                            <p><b>Members</b></p>
                            <Table className="[&_td]:pl-0 [&_tr:hover]:bg-transparent">
                                <TableBody>
                                    {values?.project?.members && values?.project?.members.length > 0 ? ((values?.project?.members.map)(member => (
                                        <TableRow key={member.id}>
                                            <TableCell>
                                                <div className="flex gap-2 items-center">
                                                    <Avatar>
                                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                        <AvatarFallback>{initialsFormat(member.name)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <span className="text-blue-400 dark:text-gray-200">{member.name}</span><br/>
                                                        <small className="text-gray-500 dark:text-gray-200">{member.email}</small>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={1} className="text-center py-4">No Members Yet.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="text-sm mt-10">
                            <p><b>Description</b></p>
                            <p className="text-gray-500 dark:text-gray-200 mt-4">
                                {values.project.description}
                            </p>
                        </div>  
                    </CardContent>

                    <Separator/>

                    <CardFooter className="flex justify-end gap-2">
                        <Button variant={"secondary"} asChild>
                            <Link href={index.url()}>
                                Go Back
                            </Link>
                        </Button>
                        <Button variant={"secondary"} asChild>
                            <Link href={edit.url(values.project.id)}>
                                Edit
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            
            </div>
        </Main>
    );
}
