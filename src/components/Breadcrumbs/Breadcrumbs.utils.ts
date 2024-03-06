import { Route } from "antd/lib/breadcrumb/Breadcrumb";
import { PATHS } from "@constants/PATHS";

export const getBreadcrumbItems = (path: string): Route[] => {

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