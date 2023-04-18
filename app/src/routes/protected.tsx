import React from "react";
import {Navigate} from "react-router-dom";
import {Layout} from "@/components/Layout/Layout";

// Testing
const user = true;

interface Props {
    children: JSX.Element;
}

export const ProtectedRoute = ({children}: Props) => {
    if (!user) {
        return <Navigate to={"/login"}/>;
    }
    return (
        <Layout>{children}</Layout>
    );
};
