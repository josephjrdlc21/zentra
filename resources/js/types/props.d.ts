import type { PageProps as InertiaPageProps } from "@inertiajs/core"

export interface PageProps extends InertiaPageProps{
    flash: any
}

export interface NotificationProps {
    status: "success" | "danger" | "warning" | "failed" | "info" | "default" | "destructive";
    message: string;
}
