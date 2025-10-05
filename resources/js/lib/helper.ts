export function strTitleCase(str: string): string {
    if (!str) return "";

    return str.replace(/\w\S*/g, (w) =>
        w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    );
}

export function statusBadgeClass(status: string): string {
    switch (status.toLowerCase()){
        case "active":
            return "green";
        case "inactive":
            return "red";
        default:
            return "gray";
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