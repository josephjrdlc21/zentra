import { Head } from "@inertiajs/react";
import Main from "@/layouts/main";
import { Dash } from "@/types/portal/main";

export default function Index({ values }: { values: Dash }){
    return(
        <Main>
            <Head title={values.page_title}>
                <meta name="description" content="Admin dashboard for Zentra app." />
            </Head>
            <h1>Hello Worlds</h1>
        </Main>
    );
}