import { ApiError, AuthState } from '@redux/auth/auth.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cleverFitApi } from '@redux/api/api';

const accessToken = localStorage.getItem('accessToken');

const initialState: AuthState = {
    rememberMe: true,
    isAuth: !!accessToken,
    isFetching: false,
    hasResult: false,
    user: '',
    error: null,
    accessToken: accessToken,
    password: '',
    email: '',
    authError: undefined
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('accessToken');
            state.isAuth = false;
            state.accessToken = null;
        },

        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },

        setToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },

        setAuthError: (state, action) => {
            state.authError = action.payload as ApiError;
        },

        resetError: (state) => {
            state.error = null;
        },

        resetHasResult: (state) => {
            state.hasResult = false;
        },

        setCredentials: (state, action: PayloadAction<{ email: string | undefined, password: string | undefined }>) => {
            const { email, password } = action.payload;
            if (email) {
                state.email = email;
            }
            if (password) {
                state.password = password;
            }
        },

        setRememberMe: (state, action) => {
            state.rememberMe = action.payload;
        },
    },

    extraReducers: (builder) => {
        const { login } = cleverFitApi.endpoints;
        builder
            .addMatcher(login.matchPending, (state) => {
                state.isFetching = true;
                state.error = null;
            })
            .addMatcher(login.matchFulfilled, (state, action) => {
                state.isFetching = false;
                state.isAuth = true;
                state.accessToken = action.payload.accessToken;
                state.error = null;

                if (state.rememberMe) {
                    localStorage.setItem('accessToken', action.payload.accessToken);
                }
            })
            .addMatcher(login.matchRejected, (state, action) => {
                state.isFetching = false;
                state.isAuth = false;
                state.error = action.payload;
                state.accessToken = '';
                localStorage.removeItem('accessToken');
            });

        const { registration } = cleverFitApi.endpoints;
        builder
            .addMatcher(registration.matchPending, (state) => {
                state.isFetching = true;
                state.error = undefined;
            })
            .addMatcher(registration.matchFulfilled, (state) => {
                state.isFetching = false;
                state.error = undefined;
            })
            .addMatcher(registration.matchRejected, (state, action) => {
                state.isFetching = false;
                state.isAuth = false;
                state.error = action.payload;
                state.accessToken = '';
            });

        const { confirmEmail } = cleverFitApi.endpoints;
        builder
            .addMatcher(confirmEmail.matchPending, (state) => {
                state.isFetching = true;
                state.error = undefined;
            })
            .addMatcher(confirmEmail.matchFulfilled, (state) => {
                state.isFetching = false;
                state.error = undefined;
            })
            .addMatcher(confirmEmail.matchRejected, (state, action) => {
                state.isFetching = false;
                state.error = action.payload;
            });

        const { checkEmail } = cleverFitApi.endpoints;
        builder
            .addMatcher(checkEmail.matchPending, (state) => {
                state.isFetching = true;
                state.error = undefined;
            })
            .addMatcher(checkEmail.matchFulfilled, (state) => {
                state.isFetching = false;
                state.error = undefined;
            })
            .addMatcher(checkEmail.matchRejected, (state, action) => {
                state.isFetching = false;
                state.error = action.payload;
            });

        const { changePassword } = cleverFitApi.endpoints;
        builder
            .addMatcher(changePassword.matchPending, (state) => {
                state.isFetching = true;
                state.error = undefined;
            })
            .addMatcher(changePassword.matchFulfilled, (state) => {
                state.isFetching = false;
                state.error = undefined;
            })
            .addMatcher(changePassword.matchRejected, (state, action) => {
                state.isFetching = false;
                state.error = action.payload;
            });
    },
});

export const {
    logout,
    setAuth,
    setToken,
    resetError,
    resetHasResult,
    setCredentials,
    setAuthError,
    setRememberMe,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
