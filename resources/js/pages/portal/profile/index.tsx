import { Head, Link, useForm } from "@inertiajs/react";
import { index } from '@/routes/portal';
import { edit_password, update_profile } from "@/routes/portal/profile";
import { Profile } from "@/types/portal/profile";
import { statusBadgeClass, boardDate, titleCase, initialsFormat } from "@/lib/helper";

import Main from "@/layouts/main";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { LoaderCircle } from 'lucide-react';

export default function Index({ values }: { values: Profile }){
    const form = useForm({
        profile_picture: null as any,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.submit(update_profile(), { forceFormData: true });
    };
    
    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="Profile for Zentra app." />
            </Head>

            <div className="w-full flex justify-center">
                <Card className="w-full max-w-2xl">
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-5 md:items-center mb-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={`${values.profile.directory}/${values.profile.filename}`} alt="@shadcn"/>
                                <AvatarFallback>{initialsFormat(values.profile.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <span className="text-blue-400">{values.profile.name}</span><br/>
                                <small>{values.profile.email}</small>
                            </div>
                        </div>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Change Profile</Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[425px]">
                                <form onSubmit={handleSubmit} > 
                                    <DialogTitle className="my-4">New Picture</DialogTitle>
                                    <DialogDescription className="my-2">
                                        Make changes to your profile here. Click save when you&apos;re done.
                                    </DialogDescription>

                                    <div className="grid gap-4 mb-4">
                                        <Label htmlFor="Picture">Change Profile</Label>
                                        <Input
                                            type="file"
                                            onChange={(e) => form.setData('profile_picture', e.target.files?.[0] ?? null)}
                                        />
                                        {form.errors.profile_picture && <small className="text-red-500">{form.errors.profile_picture}</small>}
                                    </div>

                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                            <Button type="submit" disabled={form.processing}>
                                                {form.processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                                Save changes
                                            </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>

                        <h1 className="mt-4 text-lg font-semibold">About</h1>

                        <div className="flex flex-col md:flex-row mt-2 gap-5 md:gap-10">
                            <div className="text-sm">
                                <div className="flex flex-col md:flex-row gap-3 mt-2">
                                    <p><b>Role:</b></p>
                                    <p>
                                        {values.profile.roles.length > 0
                                        ? values.profile.roles.map((role: { name: string }) => titleCase(role.name)).join(',')
                                        : 'No roles'}
                                    </p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-3 mt-2">
                                    <p><b>Created:</b></p>
                                    <p>{boardDate(values.profile.created_at)}</p>
                                </div>
                            </div>
                            
                            <div className="text-sm">
                                <div className="flex flex-col md:flex-row gap-3 mt-2">
                                    <p><b>Status:</b></p>
                                    <Badge variant={statusBadgeClass(values.profile.status) as any}>{values.profile.status}</Badge>
                                </div>
                                <div className="flex flex-col md:flex-row gap-3 mt-2">
                                    <p><b>Updated:</b></p>
                                    <p>{boardDate(values.profile.updated_at)}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <Separator/>

                    <CardFooter className="flex flex-col md:flex-row justify-end gap-2">
                        <Button variant={"secondary"} asChild>
                            <Link href={index()}>
                                Go to Dashboard
                            </Link>
                        </Button>
                        <Button variant={"secondary"} asChild>
                            <Link href={edit_password()}>
                                Change Password
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </Main>
    );
}