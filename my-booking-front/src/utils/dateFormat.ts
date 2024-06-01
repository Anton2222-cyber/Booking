export const convertToTimestamptz = (date: Date): string => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
};

export const convertFromTimestamptz = (timestamptz: string): Date => {
    return new Date(timestamptz);
};

export const handleStartDateChange = (date: Date) => {
    date.setUTCHours(12, 0, 0, 0);
    return date;
};

export const handleEndDateChange = (date: Date) => {
    date.setUTCHours(11, 59, 59, 999);
    return date;
};

export const formatToShortDate = (dateString: string): string => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear().toString().slice(-2);

    return `${day} ${month} ${year}`;
};

export const calculateDays = (fromDate: string, toDate: string): number => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const diffTime = Math.abs(to.getTime() - from.getTime());

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
