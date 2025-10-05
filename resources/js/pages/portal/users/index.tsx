import { Head, Link } from "@inertiajs/react";
import Main from "@/layouts/main";
import { Users } from "@/types/portal/user";

export default function Index({ values }: { values: Users }){
    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="List of user for Zentra app." />
            </Head>
            <h1>Users List</h1>
        </Main>
    );
}