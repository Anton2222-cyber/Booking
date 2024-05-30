import { Photo } from "interfaces/photo";

export interface Convenience {
    id: number;
    name: string;
}

export interface FreeTime {
    from: string;
    to: string;
}

export interface Room {
    id: number;
    name: string;
    price: number;
    adultPlaces: number;
    childrenPlaces: number;
    hotelId: number;
    photos: Photo[];
    conveniences: Convenience[];
}

export interface GetRoomPageRequest {
    name?: string;
    price?: number;
    minPrice?: number;
    maxPrice?: number;
    adultPlaces?: number;
    minAdultPlaces?: number;
    maxAdultPlaces?: number;
    childrenPlaces?: number;
    minChildrenPlaces?: number;
    maxChildrenPlaces?: number;
    hotelId?: number;
    convenienceIds?: number[];
    isRandomItems?: boolean;
    pageIndex?: number;
    pageSize?: number;
    freeTime?: FreeTime;
}
