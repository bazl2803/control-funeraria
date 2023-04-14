import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {};

export default function App({}: Props) {
  return (
    <React.Suspense>
      <Outlet />
    </React.Suspense>
  );
}

export const protectedRoutes = [
  {
    path: "/app",
    element: <App />,
    children: [
      { path: "/clients", element: "Clients Page" },
      { path: "/policies", element: "Policies Page" },
      { path: "/services", element: "Services Page" },
      { path: "/routes", element: "Routes Page" },
      { path: "/settings", element: "Settings Page" },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
