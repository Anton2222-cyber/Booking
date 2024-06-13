import { createSlice } from "@reduxjs/toolkit";
import { ILocation, User, UserState } from "interfaces/user";
import { jwtParser } from "utils/jwtParser.ts";

const initialState: UserState = {
    location: null,
    user: jwtParser(localStorage.getItem("authToken")) as User,
    token: localStorage.getItem("authToken") || null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLocation: (state, action: { payload: ILocation }) => {
            state.location = action.payload;
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
export const getUserLocation = (state: { user: UserState }) => state.user.location;
export const { setLocation, setCredentials, logOut } = userSlice.actions;
export default userSlice.reducer;
