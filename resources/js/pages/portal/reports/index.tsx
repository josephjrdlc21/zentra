import { Head, Link, usePage, useForm, router } from "@inertiajs/react";
import { Reports } from "@/types/portal/report";
import { PageProps } from "@/types/props";
import { statusBadgeClass, boardDate, initialsFormat } from "@/lib/helper";

import Main from "@/layouts/main";
import PagePagination from "@/components/page-paginate";
import ConfirmDialog from "@/components/confirmation";
import { Notification } from "@/components/notification";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Search, FunnelX, Plus } from "lucide-react";

export default function Index({ values }: { values: Reports }){
    const { flash } = usePage<PageProps>().props;

    const form = useForm({keyword: values.keyword ?? '',});
    
    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();

        //form.submit(index());
    }

    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="List of user for Zentra app." />
            </Head>

            <Card className="py-0 gap-0 px-6 mb-5">
                <CardTitle className="text-lg mt-5">Reports</CardTitle>
                <CardDescription className="mt-2 mb-5">Generate and review detailed reports on users, transactions, and system activities.</CardDescription>
            </Card>

            
        </Main>
    );
}