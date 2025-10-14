import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Task } from "@/types/portal/task";
import { PageProps } from '@/types/props';
import { board, update } from "@/routes/portal/tasks";
import { dateTimeInput } from "@/lib/helper";

import Main from "@/layouts/main";
import { Notification } from "@/components/notification";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { LoaderCircle } from 'lucide-react';

export default function Edit({ values }: { values: Task }){
    const { flash } = usePage<PageProps>().props;
    const today = new Date();
    const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

    const form = useForm({
        name: values.tasks.name ?? '',
        due_date: dateTimeInput(values.tasks.end_date) ?? '',
        project: values.tasks.project.id.toString() ?? '', 
        priority: values.tasks.priority ?? '', 
        assigned_to: values.tasks.assigned.id.toString() ?? '', 
    });

    const handelSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        form.submit(update(values.tasks.id));
    };

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="Edit task for Zentra app." />
            </Head>

            <form onSubmit={handelSubmit} className="w-full flex justify-center">
                <Card className="w-full max-w-3xl">
                    <CardHeader>
                        <CardTitle className="text-lg">Edit task form</CardTitle>
                        <CardDescription>Fill up the ( * ) required fields before submitting the form.</CardDescription>
                    </CardHeader>

                    <Separator/>

                    <CardContent>
                        {flash.message && <div>
                            <Notification status={flash.status} message={flash.message} />
                        </div>}

                        <div className="flex flex-col gap-2 mb-4 mt-4">
                            <Label htmlFor="project">Project <span className="text-red-500">*</span></Label>
                            <Select value={form.data.project} onValueChange={(e) => form.setData('project', e)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Project" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Projects</SelectLabel>
                                        {Object.entries(values.projects).map(([id, name]) => (
                                            <SelectItem key={id} value={id}>{name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {form.errors.project && <small className="text-red-500">{form.errors.project}</small>}
                        </div>

                        <div className="flex flex-col gap-2 mb-4 mt-4">
                            <Label htmlFor="name">Task Name <span className="text-red-500">*</span></Label>
                            <Input id="name" type="text" placeholder="UI Design, Bug Fixing etc." value={form.data.name} onChange={(e) => form.setData('name', e.target.value)}/>
                            {form.errors.name && <small className="text-red-500">{form.errors.name}</small>}
                        </div>

                        <div className="flex flex-col gap-2 mb-4 mt-4">
                            <Label htmlFor="assigned_to">Assigned To <span className="text-red-500">*</span></Label>
                            <Select value={form.data.assigned_to} onValueChange={(e) => form.setData('assigned_to', e)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Member" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Members</SelectLabel>
                                        {Object.entries(values.users).map(([id, name]) => (
                                            <SelectItem key={id} value={id}>{name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {form.errors.assigned_to && <small className="text-red-500">{form.errors.assigned_to}</small>}
                        </div>

                        <div className="flex flex-col gap-2 mb-4 mt-4">
                            <Label htmlFor="priority">Priority <span className="text-red-500">*</span></Label>
                            <Select value={form.data.priority} onValueChange={(e) => form.setData('priority', e)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Priorities</SelectLabel>
                                        <SelectItem value="normal">Normal</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {form.errors.priority && <small className="text-red-500">{form.errors.priority}</small>}
                        </div>

                        <div className="flex flex-col gap-2 mb-4 mt-4">
                            <Label htmlFor="due_date">Due Date <span className="text-red-500">*</span></Label>
                            <Input id="due_date" type="datetime-local" min={local} value={form.data.due_date} onChange={(e) => form.setData('due_date', e.target.value)}/>
                            {form.errors.due_date && <small className="text-red-500">{form.errors.due_date}</small>}
                        </div>
                    </CardContent>

                    <Separator/>

                    <CardFooter className="flex justify-end gap-2">
                        <Button variant={"secondary"} asChild>
                            <Link href={board.url()}>
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