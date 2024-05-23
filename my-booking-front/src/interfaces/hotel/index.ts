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

export interface HotelAddressCity {
    id?: number;
    name?: string;
    longitude?: number;
    latitude?: number;
    minLongitude?: number;
    maxLongitude?: number;
    minLatitude?: number;
    maxLatitude?: number;
    countryId?: number;
}

export interface HotelAddress {
    id?: number;
    street?: string;
    houseNumber?: string;
    city?: HotelAddressCity;
}

export interface GetHotelPageRequest {
    name?: string;
    description?: string;
    rating?: number;
    minRating?: number;
    maxRating?: number;
    address?: HotelAddress;
    isRandomItems?: boolean;
    pageIndex?: number;
    pageSize: number;
}

export interface GetHotelPageResponse {
    data: Hotel[];
    pagesAvailable: number;
}
