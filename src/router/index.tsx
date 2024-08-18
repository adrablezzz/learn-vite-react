import React, {lazy} from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: lazy(() => import("@/App.tsx")),
    children: [
      {
        path: "",
        element: <Navigate to="/mine/minePage" replace />,
      },
      {
        path: "mine",
        children: [
          {
            path: "minePage",
            Component: lazy( () => import("@/views/mine/minePage.tsx")),
          },
        ],
      },
      {
        path: "study",
        children: [
          {
            path: "studyPage",
            Component: lazy( () => import("@/views/study/studyPage.tsx")),
          },
          {
            path: "antUI",
            Component: lazy( () => import("@/views/study/antUI.tsx")),
          },
        ],
      },
    ],
  },
  {
    path: "home",
    Component: lazy( () => import("@/views/home.tsx")),
  },
]);

interface RouteConfig {
  path: string;
  name: string;
  icon?: React.ReactNode;
  children?: RouteConfig[];
}

export const config: RouteConfig[] = [
  {
    path: "mine",
    name: "我的",
    icon: <UserOutlined />,
    children: [{ path: "minePage", name: "我的主页" }],
  },
  {
    path: "study",
    name: "学习",
    icon: <TeamOutlined />,
    children: [
      { path: "studyPage", name: "学习主页" },
      { path: "antUI", name: "ant组件" }
    ],
  },
];


/**
 * 获取路由名字
 * @param path /mine/minePage
 * @returns ['我的','我的主页']
 */
export const getRouteName = (path: String): String[] => {
  const pathArr = path.split("/").filter((item) => item);

  const routeNames: String[] = [];
  let configList = config;

  for (let i = 0; i < pathArr.length; i++) {
    let findItem = configList.find((item) => item.path === pathArr[i]);
    if (findItem) {
      routeNames[i] = findItem.name;
      if (findItem.children) {
        configList = findItem.children;
      }
    } else {
      break;
    }
  }

  return routeNames;
};
