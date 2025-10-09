import { Head, Link } from "@inertiajs/react";
import { Project } from "@/types/portal/project";
import { index } from "@/routes/portal/projects";
import { statusBadgeClass, dateOnly, initialsFormat, dateTime } from "@/lib/helper";

import Main from "@/layouts/main";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function Show({ values }: { values: Project }){
    console.log(values);

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="Show project for Zentra app." />
            </Head>

            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle className="text-lg">Project details</CardTitle>
                    <CardDescription>Review the project’s overview, adjust its settings, and manage assigned members.</CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col md:flex-row mt-2 gap-5 md:gap-10">
                        <div className="text-sm">
                            <div className="flex flex-col md:flex-row gap-3">
                                <p><b>Project:</b></p>
                                <p>{values.project.name}</p>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3 mt-5 items-center">
                                <p><b>Owner:</b></p>
                                <div className="flex gap-2 items-center">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>{initialsFormat(values.project.owner.name)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <span>{values.project.owner.name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3 mt-5">
                                <p><b>Start Date:</b></p>
                                <p>{dateOnly(values.project.start_date)}</p>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3 mt-6">
                                <p><b>Created:</b></p>
                                <p>{dateTime(values.project.created_at)}</p>
                            </div>
                        </div>

                        <div className="text-sm">
                            <div className="flex flex-col md:flex-row gap-3">
                                <p><b>Status:</b></p>
                                <Badge variant={statusBadgeClass(values.project.status) as any}>{values.project.status}</Badge>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3 mt-5 items-center">
                                <p><b>Members:</b></p>
                                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
                                    {values.project.members.slice(0, 5).map((member: any) => (
                                        <Avatar key={member.id}>
                                            <AvatarImage src="https://github.com/shadcn.png" alt={member.name} />
                                            <AvatarFallback>{initialsFormat(member.name)}</AvatarFallback>
                                        </Avatar>
                                    ))}

                                    {values.project.members.length > 5 && (
                                        <Avatar key="extra">
                                            <AvatarFallback>
                                                +{values.project.members.length - 5}
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3 mt-5">
                                <p><b>Due Date:</b></p>
                                <p>{dateOnly(values.project.due_date)}</p>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3 mt-6">
                                <p><b>Updated:</b></p>
                                <p>{dateTime(values.project.updated_at)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-sm mt-5">
                        <p><b>Description</b></p>
                        <p className="text-justify mt-4">
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
                        <Link href="#">
                            Edit
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </Main>
    );
}
