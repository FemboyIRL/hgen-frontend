import './footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-info">
                <p>Teléfono: (123) 456-7890 | Email: contacto@hgensuites.com</p>
                <p>Dirección: Calle del Hotel, Ciudad, País</p>
            </div>
            <div className="footer-links">
                <ul>
                    <li>
                        <a href="#reserva">Reserva</a>
                    </li>
                    <li>
                        <a href="#politicas">Políticas</a>
                    </li>
                    <li>
                        <a href="#contacto">Contacto</a>
                    </li>
                </ul>
            </div>
            <div className="footer-socials">
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-facebook"
                        style={{ color: "#fff", backgroundColor: "#000" }}
                    >
                        <path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z" />
                    </svg>
                </a>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-instagram"
                    >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37a4 4 0 1 1-4.63-4.63 4 4 0 0 1 4.63 4.63z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                </a>
            </div>
            <div className="footer-payment">
                <p>Aceptamos: Tarjetas, Efectivo, Transferencia</p>
            </div>
        </footer>
    );
};

export default Footer;