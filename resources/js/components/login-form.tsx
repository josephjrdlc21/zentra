import { Notification } from '@/components/notification';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import { forgot_password } from '@/routes/portal/auth';

import { cn } from '@/lib/utils';
import { authenticate } from '@/routes/portal/auth';
import { PageProps } from '@/types/props';
import { useForm, usePage } from '@inertiajs/react';
import { register } from '@/routes/portal/auth';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog"

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
    const { flash } = usePage<PageProps>().props;

    const form = useForm({
        email: '',
        password: '',
    });

    const handelSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.submit(authenticate());
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>Login with your Google account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handelSubmit}>
                        <div className="grid gap-6">
                            {flash.message && <Notification status={flash.status} message={flash.message} />}
                            <div className="flex flex-col gap-4">
                                <Button variant="outline" className="w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Login with Google
                                </Button>
                            </div>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-card px-2 text-muted-foreground">Or continue with</span>
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        value={form.data.email}
                                        onChange={(e) => form.setData('email', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a href={forgot_password.url()} className="ml-auto text-sm underline-offset-4 hover:underline">
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="************"
                                        value={form.data.password}
                                        onChange={(e) => form.setData('password', e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={form.processing}>
                                    {form.processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Log in
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{' '}
                                <a href={register.url()} className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-center text-xs text-balance text-muted-foreground *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
                By clicking continue, you agree to our{" "}
                {/* Terms of Service */}
                <Dialog>
                    <DialogTrigger asChild>
                    <button className="underline text-primary cursor-pointer px-1">
                        Terms of Service
                    </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Terms of Service</DialogTitle>
                        <DialogDescription>Please read these terms carefully before using the application.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 text-sm">
                        <p>This project is a personal, non-commercial application created for learning and demonstration purposes.</p>
                        <ul className="list-disc pl-4 space-y-1">
                        <li>The owner may change or remove features at any time without notice.</li>
                        <li>All user accounts and stored data can be deleted by the owner at any time.</li>
                        <li>You are responsible for the accuracy of any information you provide.</li>
                        <li>The application is provided “as is” without warranties of any kind.</li>
                        </ul>
                        <p>If you do not agree, please discontinue using the application.</p>
                    </div>
                    </DialogContent>
                </Dialog>
                {" and "}
                {/* Privacy Policy */}
                <Dialog>
                    <DialogTrigger asChild>
                    <button className="underline text-primary cursor-pointer px-1">
                        Privacy Policy
                    </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Privacy Policy</DialogTitle>
                            <DialogDescription>Learn how your information is collected, used, and protected.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-3 text-sm">
                            <p>This is a personal project and does not commercially process or sell user data.</p>
                            <ul className="list-disc pl-4 space-y-1">
                            <li>The application may store any information you provide (e.g., name, email, account data).</li>
                            <li>Your data may be deleted by the owner at any time, especially during updates or resets.</li>
                            <li>No information is shared with third-party services except those required for basic functionality.</li>
                            <li>You may request data deletion at any time.</li>
                            </ul>
                            <p>Using this application means you agree to this Privacy Policy.</p>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
