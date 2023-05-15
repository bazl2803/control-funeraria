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
                    <ClientsPage/>
                </ProtectedRoute>
            }
        />
    </Routes>
);
