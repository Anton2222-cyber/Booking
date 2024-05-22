export interface ILocation {
    latitude: number;
    longitude: number;
}

export interface UserState {
    location: ILocation | null;
}
