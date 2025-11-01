import { Head, Link } from "@inertiajs/react";
import { User } from "@/types/portal/user";
import { index, edit } from "@/routes/portal/users";
import { statusBadgeClass, boardDate, titleCase, initialsFormat } from "@/lib/helper";

import Main from "@/layouts/main";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function Show({ values }: { values: User }){
    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="Show user for Zentra app." />
            </Head>

            <div className="w-full flex justify-center">

                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg">Member details</CardTitle>
                        <CardDescription>Manage the personal information and account settings of the selected user.</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-5 md:items-center">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={`${values.user.directory}/${values.user.filename}`} alt="@shadcn"/>
                                <AvatarFallback>{initialsFormat(values.user.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <span className="text-blue-400">{values.user.name}</span><br/>
                                <small>{values.user.email}</small>
                            </div>
                        </div>

                        <h1 className="mt-4 text-lg font-semibold">About</h1>

                        <div className="flex flex-col md:flex-row mt-2 gap-5 md:gap-10">
                            <div className="text-sm">
                                <div className="flex flex-col md:flex-row gap-3 mt-2">
                                    <p><b>Role:</b></p>
                                    <p>
                                        {values.user.roles.length > 0
                                            ? values.user.roles.map((role: { name: string }) => titleCase(role.name)).join(',')
                                            : 'No roles'}
                                    </p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-3 mt-2">
                                    <p><b>Created:</b></p>
                                    <p>{boardDate(values.user.created_at)}</p>
                                </div>
                            </div>
                            
                            <div className="text-sm">
                                <div className="flex flex-col md:flex-row gap-3 mt-2">
                                    <p><b>Status:</b></p>
                                    <Badge variant={statusBadgeClass(values.user.status) as any}>{values.user.status}</Badge>
                                </div>
                                <div className="flex flex-col md:flex-row gap-3 mt-2">
                                    <p><b>Updated:</b></p>
                                    <p>{boardDate(values.user.updated_at)}</p>
                                </div>
                            </div>
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
                            <Link href={edit(values.user.id)}>
                                Edit
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

            </div>
        </Main>
    );
}