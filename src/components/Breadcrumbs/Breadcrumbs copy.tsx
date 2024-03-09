import { FC } from 'react';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import { getItems } from './Breadcrumbs.utils';

export type Item = {
    path: string;
    breadcrumbName: string;
};

export const Breadcrumbs: FC = () => {
    const location = useLocation();
    const routes = getItems(location.pathname);

    return <Breadcrumb routes={routes} />;
};
