import { createApi } from "@reduxjs/toolkit/query/react";
import { GetPageResponse } from "interfaces/index.ts";
import { CreateReview, GetReviewPageRequest, Review } from "interfaces/review";
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
        addReview: builder.mutation({
            query: (review: CreateReview) => {
                const reviewFormData = new FormData();
                reviewFormData.append("description", review.description);
                reviewFormData.append("score", review.score.toString());
                reviewFormData.append("hotelId", review.hotelId.toString());

                if (review.photos) {
                    Array.from(review.photos).forEach((image) => reviewFormData.append("Photos", image));
                }

                return {
                    url: "create",
                    method: "POST",
                    body: reviewFormData,
                };
            },
            invalidatesTags: ["Review"],
        }),
    }),
});

export const { useGetAllReviewsQuery, useGetPageReviewsQuery, useAddReviewMutation } = reviewApi;
