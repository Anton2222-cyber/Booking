export interface GetPageResponse<T> {
    data: T[];
    pagesAvailable: number;
    itemsAvailable: number;
}
