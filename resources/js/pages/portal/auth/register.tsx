import { Head, useForm, usePage  } from "@inertiajs/react";
import { Regist } from "@/types/portal/register";
import { login, store } from "@/routes/portal/auth";
import { home } from "@/routes/portal";
import { PageProps } from '@/types/props';

import { Notification } from '@/components/notification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { PocketKnife, LoaderCircle } from "lucide-react";

export default function Register({ values }: { values: Regist }) {
    const { flash } = usePage<PageProps>().props;

    const form = useForm(
        {
            name: '', 
            email: '',
            type: '',
            password: '',
            password_confirmation: '',
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.submit(store());
    };

    return (
        <>
            <Head title={values.page_title}>
                <meta name="description" content="Register to Zentra admin portal" />
            </Head>
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-xl flex-col gap-6">
                    <a href={home.url()} className="flex items-center gap-2 self-center font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-xl">
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
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-6">
                                    {flash.message && <Notification status={flash.status} message={flash.message} />}
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="owner">Register as </Label>
                                            <Select value={form.data.type} onValueChange={(e) => form.setData('type', e)}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                    {values.roles.map((role: { id: number; name: string; }) => (
                                                        <SelectItem
                                                            key={role.id}
                                                            value={role.name}
                                                        >
                                                            {role.name}
                                                        </SelectItem>
                                                    ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {form.errors.type && <small className="text-red-500">{form.errors.type}</small>}
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Juan Dela Cruz"
                                                value={form.data.name} 
                                                onChange={(e) => form.setData('name', e.target.value)}
                                            />
                                            {form.errors.name && <small className="text-red-500">{form.errors.name}</small>}
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="m@example.com"
                                                value={form.data.email} 
                                                onChange={(e) => form.setData('email', e.target.value)}
                                            />
                                            {form.errors.email && <small className="text-red-500">{form.errors.email}</small>}
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="************"
                                                value={form.data.password} 
                                                onChange={(e) => form.setData('password', e.target.value)}
                                            />
                                            {form.errors.password && <small className="text-red-500">{form.errors.password}</small>}
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="confirm_password">Confirm Password</Label>
                                            <Input
                                                id="confirm_password"
                                                type="password"
                                                placeholder="************"
                                                value={form.data.password_confirmation} 
                                                onChange={(e) => form.setData('password_confirmation', e.target.value)}
                                            />
                                        </div>
                                        <Button type="submit" className="w-full" disabled={form.processing}>
                                            {form.processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
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