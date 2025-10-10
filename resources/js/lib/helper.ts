export function strTitleCase(str: string): string {
    if (!str) return "";

    return str.replace(/\w\S*/g, (w) =>
        w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    );
}

export function statusBadgeClass(status: string): string {
    switch (status.toLowerCase()){
        case "pending":
            return "default";
        case "in_progress":
            return "warning";
        case "on_hold":
            return "secondary"
        case "active":
        case "completed":
            return "success";
        case "inactive":
        case "cancelled":
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