import { Country } from "interfaces/country";

export interface City {
    id: number;
    name: string;
    image: string;
    longitude: number;
    latitude: number;
    country: Country;
}
