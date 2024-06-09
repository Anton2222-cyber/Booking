import { createApi } from "@reduxjs/toolkit/query/react";
import { GetPageResponse } from "interfaces/index.ts";
import { GetReviewPageRequest, Review } from "interfaces/review";
import { createBaseQuery } from "utils/apiUtils.ts";
import { createQueryString } from "utils/createQueryString.ts";

export const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: createBaseQuery("HotelReviews"),
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
