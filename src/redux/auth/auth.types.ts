import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export interface LoginData {
    token: string;
}

export interface ApiError {
    status: number;
    message?: string;
    data?: {
        statusCode?: number;
        error?: string;
        message?: string;
    }
}

export interface AuthState {
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
}

