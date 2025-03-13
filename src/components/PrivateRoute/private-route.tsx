import React from "react";

interface PrivateRouteProps {
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const token = localStorage.getItem("token");

    if (token) {
        return element;
    } else {
        return element;
    }
};

export default PrivateRoute;