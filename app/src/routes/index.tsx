import {Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./protected";
import {Dashboard, Landing} from "@/features/misc";
import {Login} from "@/features/auth/components/Login";
import {Routes as RoutesPage} from "@/features/routes";
import {Clients as ClientsPage} from "@/features/clients";
import {Services as ServicesPage} from "@/features/services";
import {Items as ItemsPage} from "@/features/items";
import {Policies as PoliciesPage} from "@/features/policies";

export const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route
            path="/app"
            element={
                <ProtectedRoute>
                    <Dashboard/>
                </ProtectedRoute>
            }
        />
        <Route
            path={"/routes"}
            element={
                <ProtectedRoute>
                    <RoutesPage/>
                </ProtectedRoute>
            }
        />
        <Route
            path={"/clients"}
            element={
                <ProtectedRoute>
                    <ClientsPage/>
                </ProtectedRoute>
            }
        />
        <Route
            path={"/services"}
            element={
                <ProtectedRoute>
                    <ServicesPage/>
                </ProtectedRoute>
            }
        />
        <Route
            path={"/items"}
            element={
                <ProtectedRoute>
                    <ItemsPage/>
                </ProtectedRoute>
            }
        />
        <Route
            path={"/policies"}
            element={
                <ProtectedRoute>
                    <PoliciesPage/>
                </ProtectedRoute>
            }
        />
        <Route
            path={"/credentials"}
            element={
                <ProtectedRoute>
                    <>Credentials</>
                </ProtectedRoute>
            }
        />
    </Routes>
);
