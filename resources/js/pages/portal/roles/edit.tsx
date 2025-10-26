import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Role } from "@/types/portal/role";
import { PageProps } from '@/types/props';
import { index, update } from "@/routes/portal/roles";

import Main from "@/layouts/main";
import { Notification } from "@/components/notification";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "@/components/ui/multi-select";

import { LoaderCircle } from 'lucide-react';

export default function Edit({ values }: { values: Role }){
    const { flash } = usePage<PageProps>().props;

    const form = useForm({
        role: values.role.name ?? '',
        permissions: (values.role.permissions ?? []).map((p: any) => p.name),
    });

    const handelSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.submit(update(values.role.id));
    };

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="Edit role for Zentra app." />
            </Head>

            <form onSubmit={handelSubmit} className="w-full flex justify-center">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg">Edit role form</CardTitle>
                        <CardDescription>Fill up the ( * ) required fields before submitting the form.</CardDescription>
                    </CardHeader>

                    <Separator/>

                    <CardContent>
                        {flash.message && <div>
                            <Notification status={flash.status} message={flash.message} />
                        </div>}

                        <div className="flex flex-col gap-2 mb-4 mt-4">
                            <Label htmlFor="role_name">Role Name <span className="text-red-500">*</span></Label>
                            <Input id="name" type="text" placeholder="Role Name" value={form.data.role} onChange={(e) => form.setData('role', e.target.value)}/>
                            {form.errors.role && <small className="text-red-500">{form.errors.role}</small>}
                        </div>

                        <div className="flex flex-col gap-2 mb-4 mt-4">
                            <Label htmlFor="permissions">Permissions <span className="text-red-500">*</span></Label>
                            <MultiSelect values={form.data.permissions} onValuesChange={(e) => form.setData('permissions', e)}>
                                <MultiSelectTrigger className="w-full">
                                    <MultiSelectValue placeholder="Assign Permissions" />
                                </MultiSelectTrigger>
                                <MultiSelectContent>
                                    <MultiSelectGroup>
                                        {values.permissions.map((permission: { id: number; name: string; description?: string }) => (
                                            <MultiSelectItem
                                                key={permission.id}
                                                value={permission.name}
                                            >
                                                {permission.description}
                                            </MultiSelectItem>
                                        ))}
                                    </MultiSelectGroup>
                                </MultiSelectContent>
                            </MultiSelect>
                            {form.errors.permissions && <small className="text-red-500">{form.errors.permissions}</small>}
                        </div>
                    </CardContent>

                    <Separator/>

                    <CardFooter className="flex justify-end gap-2">
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
                </Card>
            </form>
        </Main>
    );
}