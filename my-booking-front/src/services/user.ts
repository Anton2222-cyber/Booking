import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginResponse } from "interfaces/user";
import { API_URL } from "utils/getEnvData.ts";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/accounts/` }),
    tagTypes: ["User"],

    endpoints: (builder) => ({
        googleLogin: builder.mutation<LoginResponse, { credential: string }>({
            query: (data) => {
                const formData = new FormData();
                formData.append("credential", data.credential);

                return {
                    url: "GoogleSignIn",
                    method: "POST",
                    body: formData,
                };
            },
        }),
    }),
});

export const { useGoogleLoginMutation } = userApi;
