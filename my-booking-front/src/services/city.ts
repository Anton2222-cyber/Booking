import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { City, GetCityPageRequest } from "interfaces/city";
import { GetPageResponse } from "interfaces/index.ts";
import { createQueryString } from "utils/createQueryString.ts";
import { API_URL } from "utils/getEnvData.ts";

export const cityApi = createApi({
    reducerPath: "cityApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/cities/` }),
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
