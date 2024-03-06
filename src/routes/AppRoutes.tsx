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
import { PATHS, PATHS_RESULT } from '@constants/PATHS';

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
                <Route path={PATHS.auth.path} element={<Auth />} />
                <Route path={PATHS.authRegistration.path} element={<Registration />} />
                <Route path={PATHS.authChangePassword.path}
                       element={<ChangePassword email={'email@email.com'} />} />
                <Route path={PATHS_RESULT.error}
                    element={<Error navigateTo={PATHS.authRegistration.path} />} />
                <Route path={PATHS_RESULT.errorLogin} element={<ErrorLogin />} />
                <Route path={PATHS_RESULT.errorCheckEmailNoExist}
                       element={<ErrorCheckEmailNoExist />} />
                <Route path={PATHS_RESULT.errorCheckEmail} element={<ErrorCheckEmail />} />
                <Route path={PATHS_RESULT.errorUserExist} element={<ErrorUserExist />} />
                <Route path={PATHS_RESULT.errorChangePassword} element={<ErrorChangePassword />} />
                <Route path={PATHS_RESULT.success} element={<Success />} />
                <Route path={PATHS_RESULT.successChangePassword} element={<SuccessChangePassword />} />
                <Route path={PATHS.authConfirmEmail.path} element={<ConfirmEmail />} />
            </Routes>
        </>
    );
};
