import { lazy } from "react";
import { Navigate } from "react-router-dom";
// import Dashboard from "./pages/dashboard";

const Layout = lazy(() => import("./pages/dashboard"));

const ThemeRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Navigate to="/courses" /> }],
  },
];

export default ThemeRoutes;
