import { createApi } from "@reduxjs/toolkit/query/react";
import { CreateHotel, GetHotelPageRequest, Hotel } from "interfaces/hotel";
import { GetPageResponse } from "interfaces/index.ts";
import { createBaseQuery } from "utils/apiUtils.ts";
import { createQueryString } from "utils/createQueryString.ts";

export const hotelApi = createApi({
    reducerPath: "hotelApi",
    baseQuery: createBaseQuery("hotels"),
    tagTypes: ["Hotels"],

    endpoints: (builder) => ({
        getHotel: builder.query<Hotel, string>({
            query: (id) => `getById/${id}`,
        }),

        getAllHotels: builder.query<Hotel[], void>({
            query: () => "getAll",
        }),

        getPageHotels: builder.query<GetPageResponse<Hotel>, GetHotelPageRequest>({
            query: (params) => {
                const queryString = createQueryString(params as Record<string, any>);
                return `getPage?${queryString}`;
            },
        }),

        addHotel: builder.mutation({
            query: (hotel: CreateHotel) => {
                const hotelFormData = new FormData();
                hotelFormData.append("Name", hotel.name);
                hotelFormData.append("Description", hotel.description);
                hotelFormData.append("Address.Street", hotel.address.street || "Default");
                hotelFormData.append("Address.HouseNumber", hotel.address.houseNumber || "Default");
                hotelFormData.append("Address.Latitude", hotel.address.latitude || "0");
                hotelFormData.append("Address.Longitude", hotel.address.longitude || "0");
                hotelFormData.append("Address.CityId", hotel.cityId?.toString() || "0");
                hotelFormData.append("TypeId", hotel.typeId?.toString() || "0");

                if (hotel.photos) {
                    Array.from(hotel.photos).forEach((image) => hotelFormData.append("Photos", image));
                }

                return {
                    url: "create",
                    method: "POST",
                    body: hotelFormData,
                };
            },
            invalidatesTags: ["Hotels"],
        }),
    }),
});

export const { useAddHotelMutation, useGetAllHotelsQuery, useGetHotelQuery, useGetPageHotelsQuery } =
    hotelApi;
