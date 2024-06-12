import { createApi } from "@reduxjs/toolkit/query/react";
import { GetPageResponse } from "interfaces/index.ts";
import { GetRoomPageRequest, Room, RoomCreate } from "interfaces/room";
import { createBaseQuery } from "utils/apiUtils.ts";
import { createQueryString } from "utils/createQueryString.ts";

export const roomApi = createApi({
    reducerPath: "roomApi",
    baseQuery: createBaseQuery("rooms"),
    tagTypes: ["Room"],

    endpoints: (builder) => ({
        getAllRooms: builder.query<Room[], void>({
            query: () => "getAll",
        }),
        getPageRooms: builder.query<GetPageResponse<Room>, GetRoomPageRequest>({
            query: (params) => {
                const queryString = createQueryString(params as Record<string, any>);
                return `getPage?${queryString}`;
            },
            providesTags: ["Room"],
            // providesTags: (_result, _error, arg) => [{ type: "Room", id: arg.hotelId }],
        }),
        addRoom: builder.mutation({
            query: (room: RoomCreate) => {
                const roomFormData = new FormData();
                roomFormData.append("Name", room.name);
                roomFormData.append("Price", room.price.toString());
                roomFormData.append("AdultPlaces", room.adultPlaces.toString());
                roomFormData.append("ChildrenPlaces", room.childrenPlaces.toString());
                roomFormData.append("HotelId", room.hotelId.toString());

                if (room.photos) {
                    Array.from(room.photos).forEach((image) => roomFormData.append("Photos", image));
                }

                if (room.convenienceIds) {
                    Array.from(room.convenienceIds).forEach((convenience) =>
                        roomFormData.append("ConvenienceIds", convenience.toString()),
                    );
                }

                return {
                    url: "create",
                    method: "POST",
                    body: roomFormData,
                };
            },
            invalidatesTags: ["Room"],
        }),
    }),
});

export const { useGetAllRoomsQuery, useGetPageRoomsQuery, useAddRoomMutation } = roomApi;
