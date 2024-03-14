import { createSlice } from '@reduxjs/toolkit';
import { TrainingsState } from './training.types';
import { cleverFitApi } from '@redux/api/api';
import { ApiError } from '@redux/auth/auth.types';

const initialState: TrainingsState = {
    isFetching: false,
    trainingList: [],
    trainings: [],
    trainingsError: null,
    hasError: false,
};

export const trainingsSlice = createSlice({
    name: 'trainings',
    initialState,
    reducers: {
        getTrainings: () => {
            cleverFitApi.useGetTrainingQuery();
        },

        getTrainingList: () => {
            cleverFitApi.useGetTrainingListQuery();
        },

        resetTrainingError: (state) => {
            state.trainingsError = null;
            state.hasError = false;
        },
    },

    extraReducers: (builder) => {
        const { getTraining } = cleverFitApi.endpoints;
        builder
            .addMatcher(getTraining.matchPending, (state) => {
                state.isFetching = true;
            })
            .addMatcher(getTraining.matchFulfilled, (state, action) => {
                state.isFetching = false;
                state.trainings = action.payload;
            })
            .addMatcher(getTraining.matchRejected, (state, action) => {
                state.isFetching = false;
                state.trainingsError = action.payload?.data as ApiError;
                state.hasError = true;
            });

        const { getTrainingList } = cleverFitApi.endpoints;
        builder
            .addMatcher(getTrainingList.matchPending, (state) => {
                state.isFetching = true;
                state.trainingsError = null;
                state.hasError = false;
            })
            .addMatcher(getTrainingList.matchFulfilled, (state, action) => {
                state.isFetching = false;
                state.trainingList = action.payload;
            })
            .addMatcher(getTrainingList.matchRejected, (state, action) => {
                state.isFetching = false;
                state.trainingsError = action.payload as ApiError;
                state.hasError = true;
            });
    },
});

export const { getTrainings, getTrainingList, resetTrainingError } = trainingsSlice.actions;

export const trainingsSelector = (state: { trainings: TrainingsState }) => state.trainings;

export const trainingsReducer = trainingsSlice.reducer;
