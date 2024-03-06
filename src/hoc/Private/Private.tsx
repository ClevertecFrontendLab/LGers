import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

type PrivateProps = {
    children: JSX.Element;
};

export const Private = ({ children }: PrivateProps): JSX.Element => {
    const { isAuth } = useAppSelector((state) => state.auth);

    if (!isAuth) {
        return <Navigate to={'/auth'} replace/>;
    }

    return children;
};
