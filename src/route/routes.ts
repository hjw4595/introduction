import { lazy } from "react";

const Main = lazy(() => import("../pages/Main"));
const Intro = lazy(() => import("../pages/Intro"));
const Experience = lazy(() => import("../pages/Experience"));

const routes = [
  {
    path: "/introduction",
    component: Main,
    name: "Main",
    exact: true,
  },
  {
    path: "/intro",
    component: Intro,
    name: "Intro",
  },
  {
    path: "/experience",
    component: Experience,
    name: "Experience",
  },
];

export default routes;
