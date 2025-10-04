import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const alertVariants = cva(
    'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
    {
        variants: {
            variant: {
                success: 'bg-green-50 text-green-800 border border-green-200 [&>svg]:text-green-600 *:data-[slot=alert-description]:text-green-700',
                danger: 'bg-red-50 text-red-800 border border-red-200 [&>svg]:text-red-600 *:data-[slot=alert-description]:text-red-700',
                warning:
                    'bg-yellow-50 text-yellow-800 border border-yellow-200 [&>svg]:text-yellow-600 *:data-[slot=alert-description]:text-yellow-700',
                failed: 'bg-red-50 text-red-800 border border-red-200 [&>svg]:text-red-600 *:data-[slot=alert-description]:text-red-700',
                info: 'bg-blue-50 text-blue-800 border border-blue-200 [&>svg]:text-blue-600 *:data-[slot=alert-description]:text-blue-700',
                default: 'bg-card text-card-foreground',
                destructive: 'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

function Alert({ className, variant, ...props }: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
    return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
    return <div data-slot="alert-title" className={cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-description"
            className={cn('col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed', className)}
            {...props}
        />
    );
}

export { Alert, AlertDescription, AlertTitle };
