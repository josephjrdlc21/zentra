import { Head } from "@inertiajs/react";
import { Regist } from "@/types/portal/register";

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { PocketKnife } from "lucide-react";

export default function Verify({ values }: { values: Regist }) {

    return (
        <>
            <Head title={values.page_title}>
                <meta name="description" content="Verify to Zentra admin portal" />
            </Head>
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-md flex-col gap-6">
                    <a href="#" className="flex items-center gap-2 self-center font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <PocketKnife className="size-4" />
                        </div>
                        Zentra
                    </a>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Verify Your Email</CardTitle>
                            <CardDescription className="text-justify"> 
                                A verification link has been sent to your registered email address.
                                Please check your inbox (and spam folder) to verify your account before logging in.
                                If you didn’t receive the verification email, please contact your administrator for assistance.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </>
    )
}