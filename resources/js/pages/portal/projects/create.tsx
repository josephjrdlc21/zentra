import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Project } from "@/types/portal/project";
import { PageProps } from '@/types/props';
import { index } from "@/routes/portal/projects";

import Main from "@/layouts/main";
import { Notification } from "@/components/notification";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

import { LoaderCircle } from 'lucide-react';

export default function Create({ values }: { values: Project }){
    const { flash } = usePage<PageProps>().props;

    // const form = useForm({name: '', email: '',});

    // const handelSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();

    //     form.submit(store());
    // };

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="Create project for Zentra app." />
            </Head>

            <Card className="w-full max-w-4xl">
                <form>
                    <CardHeader>
                        <CardTitle className="text-lg">Create project form</CardTitle>
                        <CardDescription>Fill up the ( * ) required fields before submitting the form.</CardDescription>
                    </CardHeader>
                </form>

                <Separator/>

                <CardContent>
                    {flash.message && <div className="mt-4">
                        <Notification status={flash.status} message={flash.message} />
                    </div>}

                    <div className="flex flex-col gap-2 mb-4 mt-4">
                        <Label htmlFor="name">Project Name <span className="text-red-500">*</span></Label>
                        <Input id="name" type="text" placeholder="Team Collaboration Platform" value=""/>
                    </div>

                    <div className="flex flex-col gap-2 mb-4 mt-4">
                        <Label htmlFor="name">Start Date <span className="text-red-500">*</span></Label>
                        <Input id="name" type="date" value=""/>
                    </div>

                    <div className="flex flex-col gap-2 mb-4 mt-4">
                        <Label htmlFor="name">Due Date <span className="text-red-500">*</span></Label>
                        <Input id="name" type="date" value=""/>
                    </div>

                    <div className="flex flex-col gap-2 mb-4 mt-4">
                        <Label htmlFor="name">Select Project Owner <span className="text-red-500">*</span></Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Owner" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Users</SelectLabel>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                    <SelectItem value="grapes">Grapes</SelectItem>
                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2 mb-4 mt-4">
                        <Label htmlFor="name">Project Description <span className="text-red-500">*</span></Label>
                        <Textarea placeholder="Type project description here." className="h-50"/>
                    </div>
                </CardContent>

                <Separator/>
                
                <CardFooter className="flex justify-end gap-2">
                    <Button variant={"secondary"} asChild>
                        <Link href={index.url()}>
                            Cancel
                        </Link>
                    </Button>
                    <Button type="submit">
                        Submit
                    </Button>
                </CardFooter>
            </Card>
        </Main>
    );
}