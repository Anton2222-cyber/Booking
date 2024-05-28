import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetHotelPageRequest, Hotel } from "interfaces/hotel";
import { GetPageResponse } from "interfaces/index.ts";
import { createQueryString } from "utils/createQueryString.ts";
import { API_URL } from "utils/getEnvData.ts";

export const hotelApi = createApi({
    reducerPath: "hotelApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/hotels/` }),
    tagTypes: ["Hotels"],

    endpoints: (builder) => ({
        getHotel: builder.query<Hotel, string>({
            query: (id) => `getById/${id}`,
        }),

        getAllHotels: builder.query<Hotel[], void>({
            query: () => "getAll",
        }),

        getPageHotels: builder.query<GetPageResponse<Hotel>, GetHotelPageRequest>({
            query: (params) => {
                const queryString = createQueryString(params as Record<string, any>);
                return `getPage?${queryString}`;
            },
        }),
    }),
});

export const { useGetAllHotelsQuery, useGetHotelQuery, useGetPageHotelsQuery } = hotelApi;
