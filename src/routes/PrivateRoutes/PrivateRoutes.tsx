import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from '@pages/mainPage';

import { Private } from '../../hoc/Private';
import { Feedbacks } from '@pages/Feedbacks';
import { PATHS } from '@constants/PATHS';

export const PrivateRoutes: FC = () =>
    <Routes>
        <Route path={PATHS.home.path} element={
            <Navigate to={PATHS.main.path} replace />
        } />
        <Route path={PATHS.main.path} element={
            <Private>
                <MainPage />
            </Private>
        } />
        <Route path={PATHS.feedbacks.path} element={
            <Private>
                <Feedbacks />
            </Private>
        } />
    </Routes>
