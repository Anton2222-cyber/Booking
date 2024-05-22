import { Country } from "interfaces/country";

export interface City {
    id: number;
    name: string;
    image: string;
    longitude: number;
    latitude: number;
    country: Country;
}

export interface GetCityPageRequest {
    name?: string;
    longitude?: number;
    latitude?: number;
    minLongitude?: number;
    maxLongitude?: number;
    minLatitude?: number;
    maxLatitude?: number;
    countryId?: number;
    isRandomItems?: boolean;
    pageIndex?: number;
    pageSize: number;
}

export interface GetCityPageResponse {
    data: City[];
    pagesAvailable: number;
}
