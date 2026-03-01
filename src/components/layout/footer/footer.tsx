import React from "react";
import { GeoAltFill, TelephoneFill, EnvelopeFill } from "react-bootstrap-icons";
import "./hotel-footer.css";

const HotelFooter: React.FC = () => {
    return (
        <footer className="hotel-footer">

            <div className="footer-container">

                {/* COLUMNA 1: HOTEL */}
                <div className="footer-col">
                    <h3 className="footer-logo">HGEN Rooms & Suites</h3>
                    <p className="footer-description">
                        Disfruta de una estancia cómoda, moderna y segura en el corazón de la ciudad.
                    </p>
                </div>

                {/* COLUMNA 2: CONTACTO */}
                <div className="footer-col">
                    <h4>Contacto</h4>

                    <div className="footer-item">
                        <GeoAltFill />
                        <span>Los Mochis, Sinaloa</span>
                    </div>

                    <div className="footer-item">
                        <TelephoneFill />
                        <span>+52 668 123 4567</span>
                    </div>

                    <div className="footer-item">
                        <EnvelopeFill />
                        <span>reservaciones@hgen.com</span>
                    </div>
                </div>

                {/* COLUMNA 3: LINKS */}
                <div className="footer-col">
                    <h4>Enlaces</h4>
                    <ul className="footer-links">
                        <li>Inicio</li>
                        <li>Habitaciones</li>
                        <li>Servicios</li>
                        <li>Contacto</li>
                    </ul>
                </div>

                {/* COLUMNA 4: REDES */}
                <div className="footer-col">
                    <h4>Síguenos</h4>
                    <div className="footer-socials">
                        <a href="#">Facebook</a>
                        <a href="#">Instagram</a>
                        <a href="#">WhatsApp</a>
                    </div>
                </div>

            </div>

            {/* BOTTOM */}
            <div className="footer-bottom">
                © {new Date().getFullYear()} HGEN Rooms & Suites. Todos los derechos reservados.
            </div>

        </footer>
    );
};

export default HotelFooter;