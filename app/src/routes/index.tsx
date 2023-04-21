import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./protected";
import { Dashboard, Landing } from "@/features/misc";
import { Login } from "@/features/auth/components/Login";
import { Routes as RoutesPage } from "@/features/routes";
import { Clients as ClientsPage } from "@/features/clients";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route
      path="/app"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path={"/routes"}
      element={
        <ProtectedRoute>
          <RoutesPage />
        </ProtectedRoute>
      }
    />
    <Route
      path={"/clients"}
      element={
        <ProtectedRoute>
          <ClientsPage />
        </ProtectedRoute>
      }
    />
  </Routes>
);
