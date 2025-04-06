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
            <nav className="nav d-flex justify-content-center align-items-center">
                <ul className="d-flex align-items-center mt-3">
                    <li>
                        <a className="nav-links" href="#home">
                            <House className="nav-icon d-flex justify-content-center align-items-center" size={'auto'} />
                            <span className="nav-text">Inicio</span>
                        </a>
                    </li>
                    <li>
                        <a className="nav-links" href="#habitaciones">
                            <DoorClosed className="nav-icon d-flex justify-content-center align-items-center" size={'auto'} />
                            <span className="nav-text">Habitaciones</span>
                        </a>
                    </li>
                    <li>
                        <a className="nav-links" href="#servicios">
                            <People className="nav-icon d-flex justify-content-center align-items-center" size={'auto'} />
                            <span className="nav-text">Servicios</span>
                        </a>
                    </li>
                    {user ? (
                        <li>
                            <Link to="/Reservation">
                                <Calendar className="nav-icon d-flex justify-content-center align-items-center" size={'auto'} />
                                <span className="nav-text">Mis Reservas</span>
                            </Link>
                        </li>
                    ) : (
                        <></>
                    )}
                    <li>
                        <a className="nav-links" href="#contacto">
                            <Phone className="nav-icon d-flex justify-content-center align-items-center" size={'auto'} />
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
                        </button>
                    </div>
                </>
            ) : (
                <a
                    href="/Login"
                    className="btn-inicia-sesion"
                >
                    Inicia Sesión
                </a>
            )}
        </header>
    );
};

export default Navbar;