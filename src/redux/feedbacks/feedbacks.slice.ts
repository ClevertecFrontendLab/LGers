import { createSlice } from '@reduxjs/toolkit';
import { cleverFitApi } from '@redux/api/api';
import { FeedbackState } from './feedbacks.types';

const initialState: FeedbackState = {
    isFetching: false,
    isShowSuccess: false,
    feedbacks: [],
    error: null,
    isPostError: false,
    isGetError: false,
};

export const feedbackSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
            state.isGetError = false;
            state.isPostError = false;
        },

        resetFeedbacks: (state) => {
            state.feedbacks = [];
        },

        getFeedbacks: () => {
            cleverFitApi.useGetFeedbacksQuery(null);
        },

        closeShowSuccess: (state) => {
            state.isShowSuccess = false;
        }
    },

    extraReducers: (builder) => {
        const { getFeedbacks } = cleverFitApi.endpoints;
        builder
            .addMatcher(getFeedbacks.matchPending, (state) => {
                state.isFetching = true;
                state.error = null;
                state.isGetError = false;
            })
            .addMatcher(getFeedbacks.matchFulfilled, (state, action) => {
                state.isFetching = false;
                state.error = null;
                state.feedbacks = action.payload.reverse();
                state.isGetError = false;
            })
            .addMatcher(getFeedbacks.matchRejected, (state, action) => {
                state.isFetching = false;
                state.error = action.payload;
                state.isGetError = true;
            });

        const { addFeedback } = cleverFitApi.endpoints;
        builder
            .addMatcher(addFeedback.matchPending, (state) => {
                state.isFetching = true;
                state.error = null;
                state.isPostError = false;
            })
            .addMatcher(addFeedback.matchFulfilled, (state) => {
                state.isFetching = false;
                state.error = null;
                state.isShowSuccess = true;
                state.isPostError = false;
            })
            .addMatcher(addFeedback.matchRejected, (state, action) => {
                state.isFetching = false;
                state.error = action.payload;
                state.isPostError = true;
            });
    },
});

export const {
    resetError,
    resetFeedbacks,
    closeShowSuccess,
} = feedbackSlice.actions;

export const feedbacksReducer = feedbackSlice.reducer;
