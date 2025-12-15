import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext/user-context";
import { useEffect } from "react";

export const useAuth = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Si hay usuario y estamos en login, redirigir
        if ((user && location.pathname === "/login") || (user && location.pathname === "/register")) {
            navigate("/", { replace: true });
        }
        
        // Si no hay usuario y estamos en una ruta protegida, redirigir a login
        if (!user && location.pathname !== "/login") {
            navigate("/login", { replace: true });
        }
    }, [user, navigate, location.pathname]);

    return { user };
};