import { Head, Link } from "@inertiajs/react";
import { User } from "@/types/portal/user";
import { index } from "@/routes/portal/users";

import Main from "@/layouts/main";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function Show({ values }: { values: User }){
    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="Show user for Zentra app." />
            </Head>

            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-lg">User details</CardTitle>
                    <CardDescription>Manage the personal information and account settings of the selected user.</CardDescription>
                </CardHeader>

                 
                <CardContent>
                    <div className="flex gap-5 items-center">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                            <AvatarFallback>{values.user.name}</AvatarFallback>
                        </Avatar>
                        <div>
                            <span className="text-blue-400">{values.user.name}</span><br/>
                            <small>{values.user.email}</small>
                        </div>
                    </div>
                    <h1 className="mt-4 text-lg font-semibold">About</h1>
                    <div className="flex gap-5 items-center mt-2">
                        <div className="text-sm">
                            <p>Status:</p>
                        </div>
                        <div className="text-sm">
                            <p>Active</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Main>
    );
}