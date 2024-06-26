import { PaginationOptions } from "interfaces/index.ts";
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

export interface GetRoomPageRequest extends PaginationOptions {
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
    freeTime?: FreeTime;
}

export interface RoomCreate {
    name: string;
    price: string;
    adultPlaces: string;
    childrenPlaces: string;
    hotelId: number;
    photos?: File[];
    convenienceIds?: number[];
}
