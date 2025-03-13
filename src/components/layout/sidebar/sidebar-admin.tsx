import { Link, useNavigate, useLocation } from "react-router-dom";
import { AdminRoutes } from "../../../routes/admin-routes";
import "./sidebar-admin.css";
import { DoorOpen } from "react-bootstrap-icons";
import { JSX } from "react";

type MenuItem = {
    path: string;
    element: JSX.Element;
    title: string;
    icon: JSX.Element | string;
};

export const SideBarAdmin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Función para cerrar sesión
    const logout = () => {
        // Limpiar el localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("alreadyLogIn");
        localStorage.removeItem("headers");
        localStorage.removeItem("tokenExpiry");
        localStorage.removeItem("lastStateAdded");
        localStorage.removeItem("lastCityAdded");

        // Redirigir al login
        navigate("/login");
    };

    // Función para verificar si una ruta está activa
    const isActive = (path: string) => {
        return location.pathname.includes(path);
    };

    return (
        <section className="sidebar-admin">

            {/* Menú de navegación */}
            <nav className="sidebar-menu">
                <ul className="menu-list">
                    {AdminRoutes()
                        .filter((item) => item.title)
                        .map((item: MenuItem, idx: number) => (
                            <li
                                key={`menu-${idx}`}
                                className={`menu-item ${isActive(item.path) ? "active" : ""}`}
                            >
                                <Link to={item.path} className="menu-link">
                                    <span className="menu-icon">{item.icon}</span>
                                    <span className="menu-title">{item.title}</span>
                                </Link>
                            </li>
                        ))}
                </ul>
            </nav>

            {/* Botón de salir */}
            <div className="logout-section" onClick={logout}>
                <DoorOpen className="logout-icon" size={30} />
                <Link to="" className="logout-link">
                    Salir
                </Link>
            </div>
        </section>
    );
};