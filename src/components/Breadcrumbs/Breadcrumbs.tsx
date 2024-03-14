import { FC } from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { getItems } from './Breadcrumbs.utils';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';

export type Item = {
    path: string;
    breadcrumbName: string;
};

function itemRender(
    route: Route,
    _: Record<string, string>,
    routes: Route[],
    paths: string[],
) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
        <span>{route.breadcrumbName}</span>
    ) : (
        <Link to={'/' + paths.join('/')}>{route.breadcrumbName}</Link>
    );
}

export const Breadcrumbs: FC = () => {
    const location = useLocation();

    return <Breadcrumb itemRender={itemRender} routes={getItems(location.pathname)} />;
};
