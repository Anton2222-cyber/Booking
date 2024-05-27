import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginResponse, RegisterUser } from "interfaces/user";
import { API_URL } from "utils/getEnvData.ts";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/accounts/` }),
    tagTypes: ["User"],

    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, { email: string; password: string }>({
            query: (data) => {
                const formData = new FormData();
                formData.append("email", data.email);
                formData.append("password", data.password);

                return {
                    url: "SignIn",
                    method: "POST",
                    body: formData,
                };
            },
        }),

        register: builder.mutation<LoginResponse, RegisterUser>({
            query: (data) => {
                const formData = new FormData();
                formData.append("FirstName", data.firstName);
                formData.append("LastName", data.lastName);
                formData.append("Image", data.image);
                formData.append("Email", data.email);
                formData.append("UserName", data.username);
                formData.append("Password", data.password);

                return {
                    url: "Registration",
                    method: "POST",
                    body: formData,
                };
            },
        }),

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

export const { useLoginMutation, useRegisterMutation, useGoogleLoginMutation } = userApi;
