import type { PageProps as InertiaPageProps } from "@inertiajs/core"

export interface PageProps extends InertiaPageProps{
    flash: any
}

export interface NotificationProps {
    status: "success" | "danger" | "warning" | "failed" | "info" | "default" | "destructive";
    message: string;
}

interface ConfirmDialogProps {
    triggerText?: string;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}
