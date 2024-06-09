import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_URL } from "./getEnvData.ts";

export const createBaseQuery = (endpoint: string) =>
    fetchBaseQuery({
        baseUrl: `${API_URL}/api/${endpoint}/`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("authToken");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
                return headers;
            }
        },
    });
