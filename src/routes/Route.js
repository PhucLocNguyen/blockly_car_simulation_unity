import { lazy } from "react";
import LayoutHeader from "../Components/Layouts/LayoutHeader";
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
    path: "/login",
    component: Login,
  },
  {
    path: "/#editor",
    component: WorkingPage,
  },
];
const privateRoutes = {};
export { publicRoutes, privateRoutes };
