import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store';

export interface IPost {
    id: number;
    title: string;
    body: string;
}

export interface UserCredentials {
    email: string,
    password: string,
}

export interface UserResponse {
    user: UserCredentials,
    accessToken: string,
}

export interface LoginRequest {
    email: string,
    password: string,
}

export interface CheckEmailResponse {
    data: {

        email: string,
        message: string,
    };
    error?: {
        data?: {
            error?: string;
            message?: string;
            statusCode?: number;
        };
        status?: number;
    },
}

const baseUrl = 'https://marathon-api.clevertec.ru';

export const cleverFitApi = createApi({
    reducerPath: 'cleverFitApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl,
            prepareHeaders: (headers, { getState }) => {
                const token = (getState() as RootState).auth.accessToken;

                if (token) {
                    headers.set('authorization', `Bearer ${token}`)
                }
                headers.set('Content-Type', 'application/json; charset=utf-8')

                return headers
            },
            credentials: 'include',
        }

    ),
    endpoints: (builder) => ({
        login: builder.mutation<{ accessToken: string; }, UserCredentials>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            })
        }),

        registration: builder.mutation<Record<string, never>, UserCredentials>({ // todo Record
            query: (credentials) => ({
                url: '/auth/registration',
                method: 'POST',
                body: credentials,
            })
        }),

        checkEmail: builder.mutation<CheckEmailResponse, { email: string }>({
            query: (email) => ({
                url: '/auth/check-email',
                method: 'POST',
                body: email,
            }),
        }),

        confirmEmail: builder.mutation<{ email: string, message: string }, { email: string, code: string }>({
            query: ({ email, code }) => ({
                url: '/auth/confirm-email',
                method: 'POST',
                body: { email, code },
            }),
        }),

        changePassword: builder.mutation<{ message: string }, { password: string, confirmPassword: string }>({
            query: ({ password, confirmPassword }) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: { password, confirmPassword },
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegistrationMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
} = cleverFitApi;
