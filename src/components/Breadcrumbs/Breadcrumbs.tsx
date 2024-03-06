import { FC } from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { getItems } from "./Breadcrumbs.utils";

export interface Item {
  path: string;
  breadcrumbName: string;
}

export const Breadcrumbs: FC = () => {
  const location = useLocation();

  return (
    <Breadcrumb routes={getItems(location.pathname)} />
  );
};
