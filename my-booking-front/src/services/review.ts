import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetReviewPageRequest, GetReviewPageResponse, Review } from "interfaces/review";
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

        getPageReviews: builder.query<GetReviewPageResponse, GetReviewPageRequest>({
            query: (params) => {
                const queryString = createQueryString(params as Record<string, any>);
                return `getPage?${queryString}`;
            },
        }),
    }),
});

export const { useGetAllReviewsQuery, useGetPageReviewsQuery } = reviewApi;
