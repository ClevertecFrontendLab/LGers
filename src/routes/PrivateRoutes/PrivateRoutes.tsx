import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from '@pages/mainPage';
import { FC } from 'react';

import { Private } from '../../hoc/Private';

export const PrivateRoutes: FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to={'/main'} replace/>} />
            <Route path='/main' element={
                <Private>
                    <MainPage />
                </Private>
            } />
        </Routes>
    );
};
