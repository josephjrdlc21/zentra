import { Head, Link } from "@inertiajs/react";
import { index } from '@/routes/portal';
import { edit_password } from "@/routes/portal/profile";
import { Profile } from "@/types/portal/profile";
import { statusBadgeClass, boardDate } from "@/lib/helper";

import Main from "@/layouts/main";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function Index({ values }: { values: Profile }){
    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="Profile for Zentra app." />
            </Head>

            <div className="w-full flex justify-center">
                <Card className="w-full max-w-2xl">
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-5 md:items-center">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                <AvatarFallback>{values.profile.name}</AvatarFallback>
                            </Avatar>
                            <div>
                                <span className="text-blue-400">{values.profile.name}</span><br/>
                                <small>{values.profile.email}</small>
                            </div>
                        </div>

                        <h1 className="mt-4 text-lg font-semibold">About</h1>

                        <div className="flex flex-col md:flex-row mt-2 gap-5 md:gap-10">
                            <div className="text-sm">
                                <div className="flex flex-col md:flex-row gap-3 mt-2">
                                    <p><b>Role:</b></p>
                                    <p>Admin</p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-3 mt-2">
                                    <p><b>Created:</b></p>
                                    <p>{boardDate(values.profile.created_at)}</p>
                                </div>
                            </div>
                            
                            <div className="text-sm">
                                <div className="flex flex-col md:flex-row gap-3 mt-2">
                                    <p><b>Status:</b></p>
                                    <Badge variant={statusBadgeClass(values.profile.status) as any}>{values.profile.status}</Badge>
                                </div>
                                <div className="flex flex-col md:flex-row gap-3 mt-2">
                                    <p><b>Updated:</b></p>
                                    <p>{boardDate(values.profile.updated_at)}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <Separator/>

                    <CardFooter className="flex justify-end gap-2">
                        <Button variant={"secondary"} asChild>
                            <Link href={index()}>
                                Go to Dashboard
                            </Link>
                        </Button>
                        <Button variant={"secondary"} asChild>
                            <Link href={edit_password()}>
                                Change Password
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </Main>
    );
}