import { Button } from '@/components/ui/button';
import { Notification } from '@/components/notification';

import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types/props';

export default function Welcome() {
    const { flash } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {flash.message && <Notification status={flash.status} message={flash.message}/>}
            <Button>Hello Worlds!</Button>
        </>
    );
}
