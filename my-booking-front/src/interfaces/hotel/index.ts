import { City } from "interfaces/city";
import { HotelTypes } from "interfaces/hotelTypes";
import { PaginationOptions } from "interfaces/index.ts";
import { Photo } from "interfaces/photo";

export interface Address {
    id: number;
    street: string;
    houseNumber: string;
    latitude: number;
    longitude: number;
    city: City;
}

export interface Hotel {
    id: number;
    name: string;
    description: string;
    rating: number;
    reviews: number;
    address: Address;
    type: HotelTypes;
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
    latitude?: string;
    longitude?: string;
}

export interface GetHotelPageRequest extends PaginationOptions {
    name?: string;
    description?: string;
    rating?: number;
    minRating?: number;
    maxRating?: number;
    typeId?: number;
    address?: HotelAddress;
}

export interface CreateHotel {
    name: string;
    cityId: number;
    typeId: number;
    description: string;
    address: HotelAddress;
    photos: File[];
}
