import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { bookingApi } from "services/booking.ts";
import { cityApi } from "services/city.ts";
import { favoriteHotelsApi } from "services/favoriteHotels.ts";
import { hotelApi } from "services/hotel.ts";
import { hotelTypesApi } from "services/hotelTypes.ts";
import { reviewApi } from "services/review.ts";
import { roomApi } from "services/rooms.ts";
import { userApi } from "services/user.ts";
import userReducer from "store/slice/userSlice.ts";
import {convenienceApi} from "services/convenience.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [cityApi.reducerPath]: cityApi.reducer,
        [roomApi.reducerPath]: roomApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [hotelApi.reducerPath]: hotelApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
        [bookingApi.reducerPath]: bookingApi.reducer,
        [hotelTypesApi.reducerPath]: hotelTypesApi.reducer,
        [favoriteHotelsApi.reducerPath]: favoriteHotelsApi.reducer,
        [convenienceApi.reducerPath]: convenienceApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            cityApi.middleware,
            userApi.middleware,
            hotelApi.middleware,
            reviewApi.middleware,
            roomApi.middleware,
            bookingApi.middleware,
            hotelTypesApi.middleware,
            favoriteHotelsApi.middleware,
            convenienceApi.middleware
        ),
});

setupListeners(store.dispatch);

// Типізація Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
