export const checkStatus = (dateString: string): boolean => {
    const currentDate = new Date();
    const targetDate = new Date(dateString);

    return currentDate > targetDate;
};
