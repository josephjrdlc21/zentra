import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Project } from "@/types/portal/project";
import { PageProps } from '@/types/props';
import { index, update } from "@/routes/portal/projects";
import { dateInput } from "@/lib/helper";

import Main from "@/layouts/main";
import { Notification } from "@/components/notification";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "@/components/ui/multi-select";

import { LoaderCircle } from 'lucide-react';

export default function Edit({ values }: { values: Project }){
    const { flash } = usePage<PageProps>().props;
    const today = new Date().toISOString().split("T")[0];

    const form = useForm({
        name: values.project.name ?? '',
        due_date: dateInput(values.project.due_date) ?? '',
        owner: values.project.owner.id.toString() ?? '', 
        members: (values.project.members ?? []).map((m: any) => m.id.toString()),
        description: values.project.description ?? '',
    });

    const handelSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.submit(update(values.project.id));
    };

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="Edit project for Zentra app." />
            </Head>

            <form onSubmit={handelSubmit} className="w-full flex justify-center">

                <Card className="w-full max-w-4xl">
                    <CardHeader>
                        <CardTitle className="text-lg">Edit project form</CardTitle>
                        <CardDescription>Fill up the ( * ) required fields before submitting the form.</CardDescription>
                    </CardHeader>

                    <Separator/>

                    <CardContent>
                        {flash.message && <div className="mt-4">
                            <Notification status={flash.status} message={flash.message} />
                        </div>}

                        <div className="flex flex-col gap-2 mb-4 mt-4">
                            <Label htmlFor="name">Project Name <span className="text-red-500">*</span></Label>
                            <Input id="name" type="text" placeholder="Team Collaboration Platform" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)}/>
                            {form.errors.name && <small className="text-red-500">{form.errors.name}</small>}
                        </div>

                        <div className="flex flex-col gap-2 mb-4 mt-4">
                            <Label htmlFor="due_date">Extend Due Date <span className="text-red-500">*</span></Label>
                            <Input id="due_date" type="date" min={today} value={form.data.due_date} onChange={(e) => form.setData('due_date', e.target.value)}/>
                            {form.errors.due_date && <small className="text-red-500">{form.errors.due_date}</small>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                            <div className="flex flex-col gap-2 mb-4 mt-4">
                                <Label htmlFor="owner">Project Owner <span className="text-red-500">*</span></Label>
                                <Select value={form.data.owner} onValueChange={(e) => form.setData('owner', e)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Owner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                           {Object.entries(values.users).map(([id, name]) => (
                                                <SelectItem key={id} value={id}>{name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {form.errors.owner && <small className="text-red-500">{form.errors.owner}</small>}
                            </div>

                            <div className="flex flex-col gap-2 mb-4 mt-4">
                                <Label htmlFor="members">Members <span className="text-red-500">*</span></Label>
                                <MultiSelect values={form.data.members} onValuesChange={(e) => form.setData('members', e)}>
                                    <MultiSelectTrigger className="w-full">
                                        <MultiSelectValue placeholder="Select Members" />
                                    </MultiSelectTrigger>
                                    <MultiSelectContent>
                                        <MultiSelectGroup>
                                            {Object.entries(values.users).map(([id, name]) => (
                                                <MultiSelectItem key={id} value={id}>{name}</MultiSelectItem>
                                            ))}
                                        </MultiSelectGroup>
                                    </MultiSelectContent>
                                </MultiSelect>
                                {form.errors.members && <small className="text-red-500">{form.errors.members}</small>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mb-4 mt-4">
                            <Label htmlFor="description">Project Description <span className="text-red-500">*</span></Label>
                            <Textarea placeholder="Type project description here." className="h-50" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)}/>
                            {form.errors.description && <small className="text-red-500">{form.errors.description}</small>}
                        </div>

                        <div className="text-sm text-muted-foreground text-right">
                            {form.data.description.length}/1000
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