import { createSlice } from "@reduxjs/toolkit";
import { ILocation, UserState } from "interfaces/user";

const initialState: UserState = {
    location: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLocation: (state, action: { payload: ILocation }) => {
            state.location = action.payload;
        },
    },
});

export const getUserLocation = (state: { user: UserState }) => state.user.location;
export const { setLocation } = userSlice.actions;
export default userSlice.reducer;
