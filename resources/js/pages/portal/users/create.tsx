import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Main from "@/layouts/main";
import { User } from "@/types/portal/user";
import { PageProps } from '@/types/props';

import { Notification } from "@/components/notification";
import { Card, CardHeader, CardTitle, CardDescription, 
    CardContent, CardFooter} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { LoaderCircle } from 'lucide-react';

import { index, store } from "@/routes/portal/users";

export default function Create({ values }: { values: User }){
    const { flash } = usePage<PageProps>().props;

    const form = useForm({
        name: '',
        email: '',
    });

    const handelSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.submit(store());
    };

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="Create user for Zentra app." />
            </Head>
            <Card className="w-full max-w-2xl">
                <form onSubmit={handelSubmit}>
                    <CardHeader>
                        <CardTitle className="text-lg">Create user form</CardTitle>
                        <CardDescription>Fill up the ( * ) required fields before submitting the form.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {flash.message && <div className="mt-4">
                            <Notification status={flash.status} message={flash.message} />
                        </div>}
                        <div className="flex flex-col gap-2 mb-4 mt-4">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" placeholder="Juan Dela Cruz" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)}/>
                            {form.errors.name && <small className="text-red-500">{form.errors.name}</small>}
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="juandelacruz@example.com" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)}/>
                            {form.errors.email && <small className="text-red-500">{form.errors.email}</small>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="role">Assign Role</Label>
                            <Input id="role" type="text" placeholder="-- Select Role --"/>
                            {/* {form.errors.name && <small className="text-red-500">{form.errors.name}</small>} */}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 mt-5">
                        <Link href={index.url()}>
                            <Button variant={"secondary"}>Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={form.processing}>
                            {form.processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Submit
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </Main>
    );
}