import { Route, Routes } from "react-router-dom";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" />
      <Route path="login" />
    </Routes>
  );
};
