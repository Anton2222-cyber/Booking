import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { City } from "interfaces/city";
import { API_URL } from "utils/getEnvData.ts";

export const cityApi = createApi({
    reducerPath: "cityApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/cities/` }),
    tagTypes: ["Cities"],

    endpoints: (builder) => ({
        getAllCities: builder.query<City[], void>({
            query: () => "getAll",
        }),
    }),
});

export const { useGetAllCitiesQuery } = cityApi;
