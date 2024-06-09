import { createApi } from "@reduxjs/toolkit/query/react";
import { GetHotelPageRequest } from "interfaces/hotel";
import { HotelTypes } from "interfaces/hotelTypes";
import { GetPageResponse } from "interfaces/index.ts";
import { createBaseQuery } from "utils/apiUtils.ts";
import { createQueryString } from "utils/createQueryString.ts";

export const hotelTypesApi = createApi({
    reducerPath: "hotelTypesApi",
    baseQuery: createBaseQuery("hotelTypes"),
    tagTypes: ["HotelsTypes"],

    endpoints: (builder) => ({
        getAllHotelTypes: builder.query<HotelTypes[], void>({
            query: () => "getAll",
        }),

        getPageHotelTypes: builder.query<GetPageResponse<HotelTypes>, GetHotelPageRequest>({
            query: (params) => {
                const queryString = createQueryString(params as Record<string, any>);
                return `getPage?${queryString}`;
            },
        }),
    }),
});

export const { useGetAllHotelTypesQuery, useGetPageHotelTypesQuery } = hotelTypesApi;
