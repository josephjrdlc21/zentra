import { useState, useEffect } from "react";
import { Head, Link, usePage, useForm, router } from "@inertiajs/react";
import { useInView } from "react-intersection-observer";
import { Boards } from "@/types/portal/task";
import { PageProps } from "@/types/props";
import { board, create } from "@/routes/portal/tasks";
import { initialsFormat, statusPriority, boardDate } from "@/lib/helper";
import { cn } from '@/lib/utils';

import Main from "@/layouts/main";
import ConfirmDialog from "@/components/confirmation";
import { Notification } from "@/components/notification";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Search, FunnelX, Plus, CircleDot, CircleEllipsis, CircleX, CircleCheck, 
    ContactRound, CalendarClock, Flag
} from "lucide-react";

interface ResponseType {
    props: {
        values: {
            record: {
                data: any[];
            };
        };
    };
}

export default function Board({ values }: { values: Boards }){
    const { flash } = usePage<PageProps>().props;
    const { ref, inView, entry } = useInView({});

    const [tasks, setTasks] = useState(values.record.data);
    const [page, setPage] = useState(0);
    
    const form = useForm({keyword: values.keyword ?? '',});

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();

        form.submit(board());
    }

    useEffect(() => {
        if (inView) {
            const nextPage = page + 1;
            
            router.reload({
                data: { page: nextPage },
                onSuccess: (response: any) => {
                    setTasks((prev) => {
                        const all = [...prev, ...response.props.values.record.data];
                        const unique = all.filter(
                            (task, index, self) => index === self.findIndex((t) => t.id === task.id)
                        );
                        return unique;
                    });
                    setPage(nextPage);
                },
            });
        }
    }, [inView])

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="List of boards for Zentra app." />
            </Head>

            <Card className="py-0 gap-0 px-6 mb-3">
                <CardTitle className="text-lg mt-5">Board List</CardTitle>
                <CardDescription className="mt-2 mb-5">Browse and manage all kanban boards. Monitor task pipelines to keep your projects on track.</CardDescription>
            </Card>

            <h4 className="font-bold">All Tasks</h4>
            
            <form onSubmit={handleFilter}>
                <div className="flex flex-col md:flex-row justify-between py-3 gap-2">
                    <div className="flex flex-row gap-2">
                        <div className="w-[250px]">
                            <Input name="keyword" placeholder="Search for task" value={form.data.keyword} onChange={(e) => form.setData('keyword', e.target.value)}/>
                        </div>
                        <Button type="submit" variant={"secondary"}>
                            <Search className="size-4"/>
                        </Button>
                        <Button variant={"secondary"} asChild>
                            <Link href={board.url()}>
                                <FunnelX className="size-4"/>
                            </Link>
                        </Button>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Button asChild>
                            <Link href={create.url()}>
                                <Plus className="size-4"/>
                                Add Task
                            </Link>
                        </Button>
                    </div>
                </div>
            </form>

            {flash.message && <div className="mb-3">
                <Notification status={flash.status} message={flash.message} />
            </div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <Card className="p-0 mb-2">
                        <div className="flex justify-between items-center p-3">
                            <Badge variant="default"><CircleDot /> Pending</Badge>
                            <Plus className="size-4"/>
                        </div>
                    </Card>

                    {tasks
                        ?.filter((task: any) => task.status === 'pending')
                        .map((task: any) => (
                        <Card key={task.id} className="p-0 mt-5">
                            <div className="p-3">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm">{task.name}</p>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem className="cursor-pointer" asChild>
                                                <Link href="#">View</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer text-red-500" asChild>
                                                <Link href="#">Delete</Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <Separator className="my-2"/>

                                <div className="flex items-center gap-3 text-gray-500">
                                    <ContactRound className="size-4"/>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>{initialsFormat(task.assigned.name)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <small>{task.assigned.name}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-500 mt-2">
                                    <CalendarClock className="size-4"/>
                                    <p><small>{boardDate(task.end_date)}</small></p>
                                </div>

                                <div className="flex items-center gap-3 mt-2">
                                    <Flag className={cn('size-4', statusPriority(task.priority))}/>
                                    <p><small className="text-gray-500">{task.priority} priority</small></p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div>
                    <Card className="p-0">
                        <div className="flex justify-between items-center p-3">
                            <Badge variant="warning"><CircleEllipsis /> In Progress</Badge>
                            <Plus className="size-4"/>
                        </div>
                    </Card>

                    {tasks
                        ?.filter((task: any) => task.status === 'in_progress')
                        .map((task: any) => (
                        <Card key={task.id} className="p-0 mt-5">
                            <div className="p-3">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm">{task.name}</p>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem className="cursor-pointer" asChild>
                                                <Link href="#">View</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer text-red-500" asChild>
                                                <Link href="#">Delete</Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <Separator className="my-2"/>

                                <div className="flex items-center gap-3 text-gray-500">
                                    <ContactRound className="size-4"/>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>{initialsFormat(task.assigned.name)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <small>{task.assigned.name}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-500 mt-2">
                                    <CalendarClock className="size-4"/>
                                    <p><small>{boardDate(task.end_date)}</small></p>
                                </div>

                                <div className="flex items-center gap-3 mt-2">
                                    <Flag className={cn('size-4', statusPriority(task.priority))}/>
                                    <p><small className="text-gray-500">{task.priority} priority</small></p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div>
                    <Card className="p-0">
                        <div className="flex justify-between items-center p-3">
                            <Badge variant="destructive"><CircleX /> Cancelled</Badge>
                            <Plus className="size-4"/>
                        </div>
                    </Card>

                    {tasks
                        ?.filter((task: any) => task.status === 'cancelled')
                        .map((task: any) => (
                        <Card key={task.id} className="p-0 mt-5">
                            <div className="p-3">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm">{task.name}</p>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem className="cursor-pointer" asChild>
                                                <Link href="#">View</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer text-red-500" asChild>
                                                <Link href="#">Delete</Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <Separator className="my-2"/>

                                <div className="flex items-center gap-3 text-gray-500">
                                    <ContactRound className="size-4"/>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>{initialsFormat(task.assigned.name)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <small>{task.assigned.name}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-500 mt-2">
                                    <CalendarClock className="size-4"/>
                                    <p><small>{boardDate(task.end_date)}</small></p>
                                </div>

                                <div className="flex items-center gap-3 mt-2">
                                    <Flag className={cn('size-4', statusPriority(task.priority))}/>
                                    <p><small className="text-gray-500">{task.priority} priority</small></p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div>
                    <Card className="p-0">
                        <div className="flex justify-between items-center p-3">
                            <Badge variant="success"><CircleCheck /> Completed</Badge>
                            <Plus className="size-4"/>
                        </div>
                    </Card>

                    {tasks
                        ?.filter((task: any) => task.status === 'completed')
                        .map((task: any) => (
                        <Card key={task.id} className="p-0 mt-5">
                            <div className="p-3">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm">{task.name}</p>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem className="cursor-pointer" asChild>
                                                <Link href="#">View</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer text-red-500" asChild>
                                                <Link href="#">Delete</Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <Separator className="my-2"/>

                                <div className="flex items-center gap-3 text-gray-500">
                                    <ContactRound className="size-4"/>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>{initialsFormat(task.assigned.name)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <small>{task.assigned.name}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-500 mt-2">
                                    <CalendarClock className="size-4"/>
                                    <p><small>{boardDate(task.end_date)}</small></p>
                                </div>

                                <div className="flex items-center gap-3 mt-2">
                                    <Flag className={cn('size-4', statusPriority(task.priority))}/>
                                    <p><small className="text-gray-500">{task.priority} priority</small></p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>  
            </div>
            <div ref={ref} className="text-center mt-5">Loading...</div>
        </Main>
    );
}