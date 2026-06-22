export function formatDateTime(date: string | Date): string {
    return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function queryStringFormatter(searchParamsObj: { [key: string]: string | string[] | undefined }): string {
    let queryString = ""
    const queryArray = Object.entries(searchParamsObj).map(([key, value]) => {
        if (Array.isArray(value)) {
            return value.map((v) => `${key}=${encodeURIComponent(v)}`).join("&");
        }
        else if (value !== undefined) {
            return `${key}=${encodeURIComponent(value)}`
        }
        return ""
    })
    queryString = queryArray.filter((q) => q !== "").join("&")
    return queryString
}

export function toDateInputValue(dateString?: string | null) {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // fallback if invalid

    return date.toISOString().split("T")[0]; // => "2025-02-12"
}
