import { createApi } from "@reduxjs/toolkit/query/react";
import { Booking, CreateBooking, GetBookingsPageRequest } from "interfaces/booking";
import { GetPageResponse } from "interfaces/index.ts";
import { roomApi } from "services/rooms.ts";
import { createBaseQuery } from "utils/apiUtils.ts";
import { createQueryString } from "utils/createQueryString.ts";

export const bookingApi = createApi({
    reducerPath: "bookingApi",
    baseQuery: createBaseQuery("bookings"),
    tagTypes: ["Booking"],

    endpoints: (builder) => ({
        getBooking: builder.query<Booking, string>({
            query: (id) => `getById/${id}`,
        }),

        getPageBookings: builder.query<GetPageResponse<Booking>, GetBookingsPageRequest>({
            query: (params) => {
                const queryString = createQueryString(params as Record<string, any>);
                return `getPage?${queryString}`;
            },
            providesTags: ["Booking"],
        }),

        createBooking: builder.mutation({
            query: (booking: CreateBooking) => {
                const bookingFormData = new FormData();
                bookingFormData.append("from", booking.from);
                bookingFormData.append("to", booking.to);
                bookingFormData.append("roomId", booking.roomId.toString());

                return {
                    url: "create",
                    method: "POST",
                    body: bookingFormData,
                };
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(roomApi.util.invalidateTags(["Room"]));
            },
            invalidatesTags: ["Booking"],
        }),
    }),
});

export const { useGetBookingQuery, useCreateBookingMutation, useGetPageBookingsQuery } = bookingApi;
