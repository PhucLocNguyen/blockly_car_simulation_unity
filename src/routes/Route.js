import { Fragment, lazy } from "react";
import LayoutHeader from "../Components/Layouts/LayoutHeader";
import WorkspaceManagement from "../Components/WorkspaceManagement";
const Login = lazy(() => import("../Components/Pages/LoginPage"));
const ProjectPage = lazy(() => import("../Components/Pages/ProjectPage"));
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
    component: <Fragment/>,
  }
];
const privateRoutes = {};
export { publicRoutes, privateRoutes };
