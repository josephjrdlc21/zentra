import { Alert, AlertTitle } from '@/components/ui/alert';
import { NotificationProps } from '@/types/props';

export function Notification({ status, message }: NotificationProps) {
    return (
        <div className="grid w-full max-w-xl items-start gap-4">
            <Alert variant={status}>
                <AlertTitle>{message}</AlertTitle>
            </Alert>
        </div>
    );
}
