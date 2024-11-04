import { lazy } from "react";
import LayoutHeader from "../Components/Layouts/LayoutHeader";
import WorkspaceManagement from "../Components/WorkspaceManagement";
const Login = lazy(() => import("../Components/Pages/LoginPage"));
const ProjectPage = lazy(() => import("../Components/Pages/ProjectPage"));
const UnityWebGL = lazy(() => import("../Components/UnityWebGL"));
const publicRoutes = [
  {
    index: true,
    component: ProjectPage,
    layout: LayoutHeader
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/editor",
    component: WorkspaceManagement,
  }
  ,{
    path: "/WebGl",
    component: UnityWebGL,
  }
];
const privateRoutes = {};
export { publicRoutes, privateRoutes };
