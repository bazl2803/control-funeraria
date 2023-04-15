import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protected";
import { Landing, Dashboard } from "@/features/misc";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route
      path="/app"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
  </Routes>
);
