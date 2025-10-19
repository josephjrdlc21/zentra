import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { index } from '@/routes/portal';
import { update_pass } from "@/routes/portal/profile";
import { Profile } from "@/types/portal/profile";
import { PageProps } from '@/types/props';

import Main from "@/layouts/main";
import { Notification } from "@/components/notification";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { LoaderCircle } from 'lucide-react';

export default function ChangePassword({ values }: { values: Profile }){
    const { flash } = usePage<PageProps>().props;

    const form = useForm({ 
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handelSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        form.submit(update_pass());
    };

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="Change Password for Zentra app." />
            </Head>

            <form onSubmit={handelSubmit} className="w-full flex justify-center">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg">Change Password</CardTitle>
                        <CardDescription>Fill up the ( * ) required fields before submitting the form.</CardDescription>
                    </CardHeader>

                    <Separator />

                    <CardContent>
                        {flash.message && <div>
                            <Notification status={flash.status} message={flash.message} />
                        </div>}

                        <div className="flex flex-col gap-2 mb-4 mt-4">
                            <Label htmlFor="current_password">Current Password <span className="text-red-500">*</span></Label>
                            <Input id="current_password" type="password" placeholder="************" value={form.data.current_password} onChange={(e) => form.setData('current_password', e.target.value)}/>
                            {form.errors.current_password && <small className="text-red-500">{form.errors.current_password}</small>}
                        </div>
                        <div className="flex flex-col gap-2 mb-4 mt-4">
                            <Label htmlFor="new_password">New Password <span className="text-red-500">*</span></Label>
                            <Input id="new_password" type="password" placeholder="************" value={form.data.password} onChange={(e) => form.setData('password', e.target.value)}/>
                            {form.errors.password && <small className="text-red-500">{form.errors.password}</small>}
                        </div>
                        <div className="flex flex-col gap-2 mb-4 mt-4">
                            <Label htmlFor="confirm_password">Confirm Password <span className="text-red-500">*</span></Label>
                            <Input id="confirm_password" type="password" placeholder="************" value={form.data.password_confirmation} onChange={(e) => form.setData('password_confirmation', e.target.value)}/>
                        </div>
                    </CardContent>

                    <Separator />

                    <CardFooter className="flex justify-end gap-2 mt-5">
                        <Button variant={"secondary"} asChild>
                            <Link href={index.url()}>
                                Cancel
                            </Link>
                        </Button>
                        <Button type="submit" disabled={form.processing}>
                            {form.processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Change Password
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Main>
    );
}