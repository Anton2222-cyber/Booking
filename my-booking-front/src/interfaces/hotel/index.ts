import { City } from "interfaces/city";
import { Photo } from "interfaces/photo";

export interface Address {
    id: number;
    street: string;
    houseNumber: string;
    city: City;
}

export interface Hotel {
    id: number;
    name: string;
    description: string;
    rating: number;
    address: Address;
    photos: Photo[];
}

export interface GetHotelPageRequest {
    name?: string;
    cityName?: string;
    description?: number;
    rating?: number;
    minRating?: number;
    maxRating?: number;
    addressId?: number;
    cityId?: number;
    isRandomItems?: boolean;
    pageIndex?: number;
    pageSize: number;
}

export interface GetHotelPageResponse {
    data: Hotel[];
    pagesAvailable: number;
}
