import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const token = localStorage.getItem("token");

    if (token) {
        return element;
    } else {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;