import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetHotelPageRequest, GetHotelPageResponse, Hotel } from "interfaces/hotel";
import { createQueryString } from "utils/createQueryString.ts";
import { API_URL } from "utils/getEnvData.ts";

export const hotelApi = createApi({
    reducerPath: "hotelApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/hotels/` }),
    tagTypes: ["Hotels"],

    endpoints: (builder) => ({
        getAllHotels: builder.query<Hotel[], void>({
            query: () => "getAll",
        }),

        getPageHotels: builder.query<GetHotelPageResponse, GetHotelPageRequest>({
            query: (params) => {
                const queryString = createQueryString(params as Record<string, any>);

                console.log(queryString);

                return `getPage?${queryString}`;
            },
        }),
    }),
});

export const { useGetAllHotelsQuery, useGetPageHotelsQuery } = hotelApi;
