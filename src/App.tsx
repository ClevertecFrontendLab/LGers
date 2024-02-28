import { AppRoutes } from './routes';
import { FC } from 'react';

import 'normalize.css';
import 'antd/dist/antd.css';
import './index.scss';

export const App: FC = () => {
    return (
        <AppRoutes />
    );
};
