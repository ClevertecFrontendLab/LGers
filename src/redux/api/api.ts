import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store';
import { CheckEmailResponse, Feedback, UserCredentials } from './api.types';
import { Training, TrainingList } from '@redux/training/training.types';

const baseUrl = 'https://marathon-api.clevertec.ru';

export const cleverFitApi = createApi({
    reducerPath: 'cleverFitApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json; charset=utf-8');

            return headers;
        },
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        login: builder.mutation<{ accessToken: string }, UserCredentials>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        registration: builder.mutation<Record<string, never>, UserCredentials>({
            query: (credentials) => ({
                url: '/auth/registration',
                method: 'POST',
                body: credentials,
            }),
        }),

        checkEmail: builder.mutation<CheckEmailResponse, { email: string }>({
            query: (email) => ({
                url: '/auth/check-email',
                method: 'POST',
                body: email,
            }),
        }),

        confirmEmail: builder.mutation<
            { email: string; message: string },
            { email: string; code: string }
        >({
            query: ({ email, code }) => ({
                url: '/auth/confirm-email',
                method: 'POST',
                body: { email, code },
            }),
        }),

        changePassword: builder.mutation<
            { message: string },
            { password: string; confirmPassword: string }
        >({
            query: ({ password, confirmPassword }) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: { password, confirmPassword },
            }),
        }),

        addFeedback: builder.mutation<Record<string, never>, { message: string; rating: number }>({
            query: ({ message, rating }) => ({
                url: '/feedback',
                method: 'POST',
                body: { message, rating },
            }),
        }),

        getFeedbacks: builder.query<Feedback[], null>({
            query: () => '/feedback',
        }),

        getTraining: builder.query<Training[], void>({
            query: () => '/training',
        }),

        getTrainingList: builder.query<TrainingList[], void>({
            query: () => 'catalogs/training-list',
        }),
    }),
});

export const {
    useLoginMutation,
    useRegistrationMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
    useAddFeedbackMutation,
    useGetFeedbacksQuery,
    useLazyGetFeedbacksQuery,
    useGetTrainingListQuery,
    useGetTrainingQuery,
    useLazyGetTrainingQuery,
} = cleverFitApi;
