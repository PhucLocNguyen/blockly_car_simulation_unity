import { lazy } from "react";
import LayoutHeader from "../Components/Layouts/LayoutHeader";
const WorkspaceSimulation = lazy(() => import("../Components/Pages/UnityBlocklySimulation/WorkspaceSimulation"));
const UnityWebGL = lazy(() => import("../Components/UnityWebGL"));
const Login = lazy(() => import("../Components/Pages/LoginPage"));
const ProjectPage = lazy(() => import("../Components/Pages/ProjectPage"));
const WorkingPage = lazy(() => import("../Components/Pages/WorkingPage"));

const publicRoutes = [
  {
    index: true,
    component: ProjectPage,
    layout: LayoutHeader
  },
  {
    path:"/webgl",
    component: UnityWebGL
  }
  ,
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/editor",
    component: WorkingPage,
  },
  {
    path:"/editor-simulation",
    component:WorkspaceSimulation
  }
];
const privateRoutes = {};
export { publicRoutes, privateRoutes };
