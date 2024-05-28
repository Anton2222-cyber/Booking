import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cityApi } from "services/city.ts";
import { hotelApi } from "services/hotel.ts";
import { reviewApi } from "services/review.ts";
import { roomApi } from "services/rooms.ts";
import { userApi } from "services/user.ts";
import userReducer from "store/slice/userSlice.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [cityApi.reducerPath]: cityApi.reducer,
        [roomApi.reducerPath]: roomApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [hotelApi.reducerPath]: hotelApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            cityApi.middleware,
            userApi.middleware,
            hotelApi.middleware,
            reviewApi.middleware,
            roomApi.middleware,
        ),
});

setupListeners(store.dispatch);

// Типізація Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
