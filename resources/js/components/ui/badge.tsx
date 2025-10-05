import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
    {
        variants: {
            variant: {
                default:
                    'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 [&>svg]:text-blue-600 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800',
                secondary:
                    'bg-gray-50 text-gray-800 border border-gray-200 hover:bg-gray-100 [&>svg]:text-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700',
                success:
                    'bg-green-50 text-green-800 border border-green-200 hover:bg-green-100 [&>svg]:text-green-600 dark:bg-green-950 dark:text-green-200 dark:border-green-800',
                warning:
                    'bg-yellow-50 text-yellow-800 border border-yellow-200 hover:bg-yellow-100 [&>svg]:text-yellow-600 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-800',
                destructive:
                    'bg-red-50 text-red-800 border border-red-200 hover:bg-red-100 [&>svg]:text-red-600 dark:bg-red-950 dark:text-red-200 dark:border-red-800',
                info: 'bg-cyan-50 text-cyan-800 border border-cyan-200 hover:bg-cyan-100 [&>svg]:text-cyan-600 dark:bg-cyan-950 dark:text-cyan-200 dark:border-cyan-800',
                outline: 'bg-transparent text-foreground border border-border hover:bg-accent hover:text-accent-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

function Badge({
    className,
    variant,
    asChild = false,
    ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : 'span';

    return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
