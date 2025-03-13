import "./footer-module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaw } from "@fortawesome/free-solid-svg-icons/faPaw";

export const FooterOnModule = () => {
    return (
        <>
            <footer>
                <div className="footerContain">
                    <div className="left">
                        <FontAwesomeIcon icon={faPaw} size="2x" color="#fff" />
                        <p>
                            reservaciones@hgensuites.com<br />
                            © 2025 Michi Dev. Todos los derechos reservados
                        </p>
                    </div>
                    <img src="/assets/images/logo.jpeg" alt="" />
                </div>
            </footer>
        </>
    )
}