import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { User } from "@/types/portal/user";
import { PageProps } from '@/types/props';
import { index, update } from "@/routes/portal/users";

import Main from "@/layouts/main";
import { Notification } from "@/components/notification";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { LoaderCircle } from 'lucide-react';

export default function Edit({ values }: { values: User }){
    const { flash } = usePage<PageProps>().props;

    const form = useForm({name: values.user.name ?? '', email:  values.user.email ?? '',});

    const handelSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.submit(update(values.user.id));
    };

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="Edit user for Zentra app." />
            </Head>

            <div className="w-full flex justify-center">

                <Card className="w-full max-w-2xl">
                    <form onSubmit={handelSubmit}>
                        <CardHeader>
                            <CardTitle className="text-lg">Edit user form</CardTitle>
                            <CardDescription>Fill up the ( * ) required fields before submitting the form.</CardDescription>
                        </CardHeader>

                        <Separator className="my-5"/>

                        <CardContent>
                            {flash.message && <div className="mt-4">
                                <Notification status={flash.status} message={flash.message} />
                            </div>}
                            <div className="flex flex-col gap-2 mb-4 mt-4">
                                <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                                <Input id="name" type="text" placeholder="Juan Dela Cruz" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)}/>
                                {form.errors.name && <small className="text-red-500">{form.errors.name}</small>}
                            </div>
                            <div className="flex flex-col gap-2 mb-4">
                                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                                <Input id="email" type="email" placeholder="juandelacruz@example.com" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)}/>
                                {form.errors.email && <small className="text-red-500">{form.errors.email}</small>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="role">Assign Role <span className="text-red-500">*</span></Label>
                                <Input id="role" type="text" placeholder="-- Select Role --"/>
                                {/* {form.errors.name && <small className="text-red-500">{form.errors.name}</small>} */}
                            </div>
                        </CardContent>

                        <Separator className="mt-10"/>
                        
                        <CardFooter className="flex justify-end gap-2 mt-5">
                            <Button variant={"secondary"} asChild>
                                <Link href={index.url()}>
                                    Cancel
                                </Link>
                            </Button>
                            <Button type="submit" disabled={form.processing}>
                                {form.processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Update
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

            </div>
        </Main>
    );
}