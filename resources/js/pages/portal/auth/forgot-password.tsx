import { Head, usePage, useForm } from "@inertiajs/react";
import { Verif } from "@/types/portal/auth";
import { home } from "@/routes/portal";
import { PageProps } from '@/types/props';
import { store_forgot_password } from "@/routes/portal/auth";

import { Notification } from '@/components/notification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { PocketKnife, LoaderCircle } from "lucide-react";

export default function ForgotPassword({ values }: { values: Verif }) {
    const { flash } = usePage<PageProps>().props;

    const form = useForm(
        {
            email: '',
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.submit(store_forgot_password());
    };

    return (
        <>
            <Head title={values.page_title}>
                <meta name="description" content="Forgot Password to Zentra admin portal" />
            </Head>
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-md flex-col gap-6">
                    <a href={home.url()} className="flex items-center gap-2 self-center font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-xl">
                            <PocketKnife className="size-4" />
                        </div>
                        Zentra
                    </a>
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Forgot Password</CardTitle>
                            <CardDescription>Please enter your registered email address.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-6">
                                    {flash.message && <Notification status={flash.status} message={flash.message} />}
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="email">Enter Email</Label>
                                            <Input
                                                id="email"
                                                type="text"
                                                placeholder="sample@gmail.com"
                                                value={form.data.email}
                                                onChange={(e) => form.setData('email', e.target.value)}
                                            />
                                        </div>
                                        <Button type="submit" className="w-full" disabled={form.processing}>
                                            {form.processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                            Forgot Password
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
