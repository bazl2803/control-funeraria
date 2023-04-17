import React from "react";
import { Navigate } from "react-router-dom";

const user = true;

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};
