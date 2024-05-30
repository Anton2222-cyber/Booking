import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetPageResponse } from "interfaces/index.ts";
import { GetRoomPageRequest, Room } from "interfaces/room";
import { createQueryString } from "utils/createQueryString.ts";
import { API_URL } from "utils/getEnvData.ts";

export const roomApi = createApi({
    reducerPath: "roomApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/rooms/` }),
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
    }),
});

export const { useGetAllRoomsQuery, useGetPageRoomsQuery } = roomApi;
