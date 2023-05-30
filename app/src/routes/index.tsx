import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./protected";
import { Landing } from "@/features/misc";
import { Login } from "@/features/auth/components/Login";
import { Clients as ClientsPage } from "@/features/clients";
import { PolicyPage } from "@/features/policies";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route
      path="/app"
      element={
        <ProtectedRoute>
          <ClientsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/policy/:id"
      element={
        <ProtectedRoute>
          <PolicyPage />
        </ProtectedRoute>
      }
    />
  </Routes>
);
