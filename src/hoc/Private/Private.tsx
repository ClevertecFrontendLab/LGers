import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { PATHS } from '@constants/PATHS';
import { authSelector } from '@redux/auth/auth.slice';

type PrivateProps = {
    children: JSX.Element;
};

export const Private = ({ children }: PrivateProps): JSX.Element => {
    const { isAuth } = useAppSelector(authSelector);

    if (!isAuth) {
        return <Navigate to={PATHS.auth.path} replace />;
    }

    return children;
};
