import { createApi } from "@reduxjs/toolkit/query/react";
import { Hotel } from "interfaces/hotel";
import { GetPageResponse } from "interfaces/index.ts";
import { createBaseQuery } from "utils/apiUtils.ts";

export const favoriteHotelsApi = createApi({
    reducerPath: "favoriteHotelsApi",
    baseQuery: createBaseQuery("favoriteHotels"),
    tagTypes: ["FavoriteHotels"],

    endpoints: (builder) => ({
        getAllFavoriteHotels: builder.query<Hotel[], void>({
            query: () => "getAll",
        }),
        getUserFavoriteHotels: builder.query<GetPageResponse<Hotel>, void>({
            query: () => "getPage",
        }),
    }),
});

export const { useGetAllFavoriteHotelsQuery, useGetUserFavoriteHotelsQuery } = favoriteHotelsApi;
