import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function safeFormatDate(dateStr, formatFn, formatString = 'MMM d, yyyy') {
    if (!dateStr) return 'N/A';
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        if (typeof formatFn === 'function') {
            return formatFn(date, formatString);
        }
        return date.toLocaleDateString();
    } catch (e) {
        return dateStr;
    }
}
