import { createSlice } from '@reduxjs/toolkit';
import { TrainingsState } from './training.types';
import { cleverFitApi } from '@redux/api/api';
import { ApiError } from '@redux/auth/auth.types';
import moment from 'moment';

const initialState: TrainingsState = {
    isFetching: false,
    trainingList: [],
    trainings: [],
    trainingsError: null,
    hasError: false,
    isAddTrainee: false,
    selectedDate: moment().format(),
    selectedTrainee: undefined,
    currentExercises: [],
    currentTrainings: [],
    updatedTrainings: [],
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

        toggleDrawer: (state) => {
            state.isAddTrainee = !state.isAddTrainee;
        },

        setSelectedDate: (state, action) => {
            // state.selectedDate = moment(action.payload).format();
            state.selectedDate = moment(action.payload).format();
            // state.selectedDate = action.payload;
        },

        setSelectedTrainee: (state, action) => {
            state.selectedTrainee = action.payload;
        },

        setCurrentExercise: (state, action) => {
            state.currentExercises = action.payload;
        },

        setCurrentTrainings: (state, action) => {
            state.currentTrainings = action.payload;
        },

        setUpdatedTrainings: (state, action) => {
            state.updatedTrainings = action.payload;
        },

        setTrainings: (state, action) => {
            state.trainings = action.payload;
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

export const {
    getTrainings,
    getTrainingList,
    resetTrainingError,
    toggleDrawer,
    setSelectedDate,
    setSelectedTrainee,
    setCurrentExercise,
    setCurrentTrainings,
    setUpdatedTrainings,
    setTrainings,
} = trainingsSlice.actions;

export const trainingsSelector = (state: { trainings: TrainingsState }) => state.trainings;

export const trainingsReducer = trainingsSlice.reducer;
