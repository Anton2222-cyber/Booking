import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetPageResponse } from "interfaces/index.ts";
import { GetReviewPageRequest, Review } from "interfaces/review";
import { createQueryString } from "utils/createQueryString.ts";
import { API_URL } from "utils/getEnvData.ts";

export const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/hotelReviews/` }),
    tagTypes: ["Review"],

    endpoints: (builder) => ({
        getAllReviews: builder.query<Review[], void>({
            query: () => "getAll",
        }),

        getPageReviews: builder.query<GetPageResponse<Review>, GetReviewPageRequest>({
            query: (params) => {
                const queryString = createQueryString(params as Record<string, any>);
                return `getPage?${queryString}`;
            },
        }),
    }),
});

export const { useGetAllReviewsQuery, useGetPageReviewsQuery } = reviewApi;
