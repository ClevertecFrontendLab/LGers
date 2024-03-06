import { FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Auth } from '@pages/auth';
import { Registration } from '@pages/auth/registration';
import { ChangePassword } from '@pages/auth/change-password/ChangePassword';
import { Error } from '@pages/result/error';
import { ErrorLogin } from '@pages/result/error-login';
import { ErrorCheckEmailNoExist } from '@pages/result/error-check-email-no-exist';
import { ErrorCheckEmail } from '@pages/result/error-check-email';
import { ErrorUserExist } from '@pages/result/error-user-exist';
import { Success } from '@pages/result/success';
import { PrivateRoutes } from './PrivateRoutes';
import { setAuth, setToken } from '@redux/auth/auth.slice';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { ConfirmEmail } from '@pages/auth/confirm-email';
import { SuccessChangePassword } from '@pages/result/success-change-password';
import { ErrorChangePassword } from '@pages/result/error-change-password';

export const AppRoutes: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            dispatch(setToken(accessToken));
            dispatch(setAuth(true));
        }
    }, []);

    return (
        <>
            <PrivateRoutes />
            <Routes>
                <Route path='/auth' element={<Auth />} />
                <Route path='/auth/registration' element={<Registration />} />
                <Route path='/auth/change-password'
                       element={<ChangePassword email={'email@email.com'} />} />
                <Route path='/result/error'
                       element={<Error navigateTo={'/auth/registration'} />} />
                <Route path='/result/error-login' element={<ErrorLogin />} />
                <Route path='/result/error-check-email-no-exist'
                       element={<ErrorCheckEmailNoExist />} />
                <Route path='/result/error-check-email' element={<ErrorCheckEmail />} />
                <Route path='/result/error-user-exist' element={<ErrorUserExist />} />
                <Route path='/result/error-change-password' element={<ErrorChangePassword />} />
                <Route path='/result/success' element={<Success />} />
                <Route path='/result/success-change-password' element={<SuccessChangePassword />} />
                <Route path='/auth/confirm-email' element={<ConfirmEmail />} />
            </Routes>
        </>
    );
};
