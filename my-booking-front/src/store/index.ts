import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cityApi } from "services/city.ts";
import { userApi } from "services/user.ts";
import userReducer from "store/slice/userSlice.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [cityApi.reducerPath]: cityApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cityApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch);

// Типізація Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
