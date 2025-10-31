import { Head } from "@inertiajs/react";
import { Home as Site } from "@/types/portal/home";

import Default from "@/layouts/default";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Workflow from "@/components/workflow";
import Productivity from "@/components/productivity";

export default function Home({ values }: { values: Site }){
    return(
        <Default>
            <Head title={values.page_title}>
                <meta name="description" content="Site for Zentra app." />
            </Head>
            <section className="w-full relative py-12 md:py-24 lg:py-32 xl:py-48">
                <div
                    className="absolute w-[90vw] max-w-[590px] h-[300px] sm:h-[400px]
                        rounded-xl blur-[90px]
                        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        bg-[#f2b9a1] dark:bg-[#9e3e2b] -z-10 pointer-events-none"
                ></div>
                <Hero/>
            </section>
            <section id="features" className="w-full py-12 md:py-24 lg:py-32">
                <Features/>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30 rounded-xl">
                <Workflow/>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                <Productivity/>
            </section>
        </Default>
    );
}