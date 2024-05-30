import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateBooking } from "interfaces/booking";
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
            invalidatesTags: ["Booking"],
        }),
    }),
});

export const { useCreateBookingMutation } = bookingApi;
