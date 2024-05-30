export interface User {
    email: string;
    firstName: string;
    lastName: string;
    photo: string;
}

export interface ILocation {
    latitude: number;
    longitude: number;
}

export interface UserState {
    location: ILocation | null;
    user: User | null;
    token: string | null;
}

export interface LoginResponse {
    token: string;
}

export interface RegisterUser {
    firstName: string;
    lastName: string;
    image: File | null;
    email: string;
    username: string;
    password: string;
}
