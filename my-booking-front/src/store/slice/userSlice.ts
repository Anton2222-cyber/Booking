import { createSlice } from "@reduxjs/toolkit";
import { Hotel } from "interfaces/hotel";
import { ILocation, User, UserState } from "interfaces/user";
import { jwtParser } from "utils/jwtParser.ts";

const initialState: UserState = {
    location: null,
    user: jwtParser(localStorage.getItem("authToken")) as User,
    token: localStorage.getItem("authToken") || null,
    favoriteHotels: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLocation: (state, action: { payload: ILocation }) => {
            state.location = action.payload;
        },
        setFavorite: (state, action: { payload: Hotel[] }) => {
            state.favoriteHotels = action.payload;
        },
        setCredentials: (state, action: { payload: { user: User; token: string } }) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("authToken");
        },
    },
});

export const getUser = (state: { user: UserState }) => state.user.user;
export const getToken = (state: { user: UserState }) => state.user.token;
export const favoriteHotels = (state: { user: UserState }) => state.user.favoriteHotels;
export const getUserLocation = (state: { user: UserState }) => state.user.location;
export const { setLocation, setCredentials, logOut, setFavorite } = userSlice.actions;
export default userSlice.reducer;
