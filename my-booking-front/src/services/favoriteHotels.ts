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
            providesTags: ["FavoriteHotels"],
        }),
        getUserFavoriteHotels: builder.query<GetPageResponse<Hotel>, void>({
            query: () => "getPage",
            providesTags: ["FavoriteHotels"],
        }),
        addToFavorite: builder.mutation({
            query: (hotelId: number) => {
                const favoriteFormData = new FormData();
                favoriteFormData.append("hotelId", hotelId.toString());

                return {
                    url: "create",
                    method: "POST",
                    body: favoriteFormData,
                };
            },
            invalidatesTags: ["FavoriteHotels"],
        }),
        removeFromFavorite: builder.mutation({
            query: (hotelId: number) => ({
                url: `delete?hotelId=${hotelId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["FavoriteHotels"],
        }),
    }),
});

export const {
    useGetAllFavoriteHotelsQuery,
    useRemoveFromFavoriteMutation,
    useGetUserFavoriteHotelsQuery,
    useAddToFavoriteMutation,
} = favoriteHotelsApi;
