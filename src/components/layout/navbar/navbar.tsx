import {
    House,
    DoorClosed,
    People,
    Calendar,
    Phone,
} from "react-bootstrap-icons";
import "./navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../../context/UserContext/user-context";

const Navbar = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="logo">
                <img src="/assets/images/logo.jpeg" alt="Hgen Suites Logo" />
            </div>
            <nav className="nav">
                <ul>
                    <li>
                        <a href="#home">
                            <House className="nav-icon" />{" "}
                            <span className="nav-text">Inicio</span>
                        </a>
                    </li>
                    <li>
                        <a href="#habitaciones">
                            <DoorClosed className="nav-icon" />{" "}
                            <span className="nav-text">Habitaciones</span>
                        </a>
                    </li>
                    <li>
                        <a href="#servicios">
                            <People className="nav-icon" />{" "}
                            <span className="nav-text">Servicios</span>
                        </a>
                    </li>
                    {user ? (
                        <li>
                            <Link to="/Reservation">
                                <Calendar className="nav-icon" />{" "}
                                <span className="nav-text">Mis Reservas</span>
                            </Link>
                        </li>
                    ) : (
                        <></>
                    )}
                    <li>
                        <a href="#contacto">
                            <Phone className="nav-icon" />{" "}
                            <span className="nav-text">Contacto</span>
                        </a>
                    </li>
                </ul>
            </nav>
            {user ? (
                <>
                    <div className="button-container">
                        <button
                            className="btn-reserva"
                            onClick={() => navigate("/Reservation")}
                        >
                            Reserva aquí
                        </button>{" "}
                    </div>
                </>
            ) : (
                <a
                    href="/Login"
                    className="btn-inicia-sesion"
                    style={{ marginRight: "20px" }}
                >
                    Inicia Sesión
                </a>
            )}
        </header>
    );
};

export default Navbar;