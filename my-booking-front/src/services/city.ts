import { createApi } from "@reduxjs/toolkit/query/react";
import { City, GetCityPageRequest } from "interfaces/city";
import { GetPageResponse } from "interfaces/index.ts";
import { createBaseQuery } from "utils/apiUtils.ts";
import { createQueryString } from "utils/createQueryString.ts";

export const cityApi = createApi({
    reducerPath: "cityApi",
    baseQuery: createBaseQuery("cities"),
    tagTypes: ["Cities"],

    endpoints: (builder) => ({
        getAllCities: builder.query<City[], void>({
            query: () => "getAll",
        }),

        getPageCities: builder.query<GetPageResponse<City>, GetCityPageRequest>({
            query: (params) => {
                const queryString = createQueryString(params as Record<string, any>);
                return `getPage?${queryString}`;
            },
        }),
    }),
});

export const { useGetAllCitiesQuery, useGetPageCitiesQuery } = cityApi;
