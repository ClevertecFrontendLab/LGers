import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface ApiError {
    status: number;
    message?: string;
    data?: {
        statusCode?: number;
        error?: string;
        message?: string;
    }
}

export interface Feedback {
    id: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string | null | undefined;
    rating: number;
    createdAt: string;
};

export interface FeedbackState {
    isFetching: boolean;
    isShowSuccess: boolean;
    feedbacks: Feedback[];
    error: ApiError | FetchBaseQueryError | null | undefined;
    isPostError: boolean;
    isGetError: boolean;
};