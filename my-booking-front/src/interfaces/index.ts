export interface PaginationOptions {
    isRandomItems?: boolean;
    pageIndex?: number;
    pageSize?: number;
}

export interface GetPageResponse<T> {
    data: T[];
    pagesAvailable: number;
    itemsAvailable: number;
}
