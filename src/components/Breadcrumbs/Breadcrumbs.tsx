import { FC } from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { PATHS } from "../../constants/PATHS";

export interface Item {
  path: string;
  title: string;
}

export interface Item2 {
  path: string;
  breadcrumbName: string;
}

const getItems = (path: string): Item2[] => {
  if (path === PATHS.main.path || path === PATHS.home.path) {
    return [{ path: PATHS.main.path, breadcrumbName: PATHS.main.title }];
  }

  const items = path
    .split("/")
    .map((item) => {
      if (item) {
        return { path: PATHS[item].path, breadcrumbName: PATHS[item].title };
      }
      return { path: PATHS.main.path, breadcrumbName: PATHS.main.title };
    });

  return items;
};

export const Breadcrumbs: FC = () => {
  const location = useLocation();
  return (
    <Breadcrumb routes={getItems(location.pathname)} />
  );
};
