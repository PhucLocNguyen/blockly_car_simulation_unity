import { lazy } from "react";
import LayoutHeader from "../Components/Layouts/LayoutHeader";
import WorkspaceManagement from "../Components/WorkspaceManagement";
const Login = lazy(() => import("../Components/Pages/LoginPage"));
const ProjectPage = lazy(() => import("../Components/Pages/ProjectPage"));
const UnityWebGL = lazy(() => import("../Components/UnityWebGL"));
const ProjectManagementPage =  lazy(() => import("../Components/Pages/ProjectManagement"));
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
    path:"/simulate",
    component:UnityWebGL,
  }
  
];

const privateRoutes = [
  {
    path: "/editor",
    component: WorkspaceManagement,
    layout: LayoutHeader
  },
  {
    path: "/projects",
    component: ProjectManagementPage,
  },
];
export { publicRoutes, privateRoutes };
