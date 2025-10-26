import { Head, useForm, usePage  } from "@inertiajs/react";
import { Regist } from "@/types/portal/register";
import { login } from "@/routes/portal/auth";
import { PageProps } from '@/types/props';

import { Notification } from '@/components/notification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { PocketKnife, LoaderCircle } from "lucide-react";

export default function Register({ values }: { values: Regist }) {
    const { flash } = usePage<PageProps>().props;

    return (
        <>
            <Head title={values.page_title}>
                <meta name="description" content="Register to Zentra admin portal" />
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
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Register Account</CardTitle>
                            <CardDescription>Create a new account to get started</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid gap-6">
                                    {flash.message && <Notification status={flash.status} message={flash.message} />}
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Juan Dela Cruz"
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="m@example.com"
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="************"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="confirm_password">Confirm Password</Label>
                                            <Input
                                                id="confirm_password"
                                                type="password"
                                                placeholder="************"
                                                required
                                            />
                                        </div>
                                        <Button type="submit" className="w-full">
                                            Register
                                        </Button>
                                    </div>
                                </div>
                                <div className="text-center text-sm mt-5">
                                    Already have an account?{' '}
                                    <a href={login.url()} className="underline underline-offset-4">
                                        Sign In
                                    </a>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                    <div className="text-center text-xs text-balance text-muted-foreground *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </>
    )
}