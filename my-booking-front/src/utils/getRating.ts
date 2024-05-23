export const getRatingDescription = (rating: number): string => {
    if (rating >= 9.5) return "Відмінно";
    if (rating >= 9.0) return "Чудово";
    if (rating >= 9.0) return "Блискуче";
    if (rating >= 8.0) return "Дуже добре";
    if (rating >= 7.0) return "Добре";

    return "Задовільно";
};
