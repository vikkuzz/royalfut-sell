export function formatDateToMMDDYYYYHHMMSS(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("default", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(date);
}
