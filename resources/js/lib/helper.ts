export function strTitleCase(str: string): string {
    if (!str) return "";

    return str.replace(/\w\S*/g, (w) =>
        w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    );
}

export function statusBadgeClass(status: string): string {
    switch (status.toLowerCase()){
        case "pending":
        case "normal":
            return "default";
        case "in_progress":
        case "medium":
            return "warning";
        case "on_hold":
            return "secondary"
        case "active":
        case "completed":
            return "success";
        case "inactive":
        case "cancelled":
        case "high":
            return "destructive";
        default:
            return "default";
    }
}

export function dateTime(input: string): string {
    if (!input) return "";

    const date = new Date(input);

    return new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Singapore",
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(date);
}

export function dateOnly(isoString: string): string {
    const date = new Date(isoString);
    
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
}

export function formatId(id: number, length: number = 5): string {
    return String(id).padStart(length, "0");
}

export function quantityFormat(value: number | string): string {
    if (value === null || value === undefined) return "";

    const num = typeof value === "string" ? parseInt(value, 10) : value;
    
    if (isNaN(num)) return "";

    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
    }).format(num);
}

export function priceFormat(value: number | string): string {
    if (value === null || value === undefined) return "";

    const num = typeof value === "string" ? parseFloat(value) : value;
    
    if (isNaN(num)) return "";

    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);
}

export function initialsFormat(name: string): string {
    if (!name) return "";

    const words = name.trim().split(/\s+/);
    const initials = words.slice(0, 2).map(word => word[0]?.toUpperCase() || "").join("");

    return initials;
}

export function dateInput(dateString: string | null | undefined): string {
  if (!dateString) return ''

    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
        console.warn(`Invalid date string: ${dateString}`)
        return ''
    }

    return date.toISOString().split('T')[0]
}

export function boardDate(input: string): string {
    if (!input) return '';

    const date = new Date(input);

    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    const formatted = date.toLocaleString('en-US', options);

    return formatted.replace(',', ' -');
}

export function statusPriority(status: string): string {
    switch (status.toLowerCase()){
        case "normal":
            return "text-blue-500";
        case "medium":
            return "text-amber-500";
        case "high":
            return "text-red-500"
        default:
            return "default";
    }
}

export function dateTimeInput(dateString: string | null | undefined): string {
    if (!dateString) return ''

    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
        console.warn(`Invalid date string: ${dateString}`)
        return ''
    }

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day}T${hours}:${minutes}`
}

export function textSpace(str: string): string {
    return str.replace(/_/g, ' ');
};

export function titleCase (str: string): string {
    return str
        .toLowerCase()
        .split(/[\s_]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals: { label: string; seconds: number }[] = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
}