import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { authReducer } from '@redux/auth/auth.slice';
import { cleverFitApi } from '@redux/api/api';
import { feedbacksReducer } from './feedbacks/feedbacks.slice';
import { trainingsReducer } from './training/training.slice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const combinedReducer = combineReducers({
    router: routerReducer,
    auth: authReducer,
    feedbacks: feedbacksReducer,
    trainings: trainingsReducer,
    [cleverFitApi.reducerPath]: cleverFitApi.reducer,
});

const rootReducer: Reducer = (state: RootState, action) => {
    if (action.type === 'auth/logout') {
        return combinedReducer({} as RootState, action);
    }

    return combinedReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddleware).concat(cleverFitApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const history = createReduxHistory(store);
