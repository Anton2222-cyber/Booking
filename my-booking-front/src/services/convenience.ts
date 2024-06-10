import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import {Convenience} from "interfaces/room";

export const convenienceApi = createApi({
    reducerPath: "convenienceApi",
    baseQuery: createBaseQuery("conveniences"),
    tagTypes: ["Conveniences"],

    endpoints: (builder) => ({
        getAllConveniences: builder.query<Convenience[], void>({
            query: () => "getAll",
        }),
    }),
});

export const { useGetAllConveniencesQuery } = convenienceApi;
