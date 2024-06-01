import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Booking, CreateBooking, GetBookingsPageRequest } from "interfaces/booking";
import { GetPageResponse } from "interfaces/index.ts";
import { roomApi } from "services/rooms.ts";
import { createQueryString } from "utils/createQueryString.ts";
import { API_URL } from "utils/getEnvData.ts";

export const bookingApi = createApi({
    reducerPath: "bookingApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/api/bookings/`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("authToken");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
                return headers;
            }
        },
    }),
    tagTypes: ["Booking"],

    endpoints: (builder) => ({
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

export const { useCreateBookingMutation, useGetPageBookingsQuery } = bookingApi;
