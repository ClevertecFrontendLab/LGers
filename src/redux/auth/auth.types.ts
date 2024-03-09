import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export type LoginData = {
    token: string;
};

export type ApiError = {
    status: number;
    message?: string;
    data?: {
        statusCode?: number;
        error?: string;
        message?: string;
    };
};

export type AuthState = {
    rememberMe: boolean;
    isAuth: boolean;
    isFetching: boolean;
    hasResult: boolean;
    user: string | null;
    email: string | null | undefined;
    password: string | null | undefined;
    accessToken: string | undefined | null;
    error: ApiError | FetchBaseQueryError | undefined | null;
    authError?: undefined | ApiError;
};
