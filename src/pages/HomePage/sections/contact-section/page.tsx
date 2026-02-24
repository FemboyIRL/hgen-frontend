import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa"
import { ContactCardProp } from "./contact-card-props"


function ContactSection() {

    const contacts: ContactCardProp[] = [
        {
            icon: <FaMapMarkerAlt />,
            name: "Dirección",
            information: "Av. Monterrey #729, Col. Anahuac, 81200"
        },
        {
            icon: <FaEnvelope />,
            name: "Email",
            information: "reservaciones@hgensuites.com"
        },
        {
            icon: <FaPhoneAlt />,
            name: "Llámanos",
            information: "1 (234) 567-891"
        }
    ]

    return (
        <div className="container my-4">
            <div className="row">

                {/* HEADER */}
                <div className="col-12 text-center mb-3">
                    <h4 className="title">Contáctanos</h4>
                    <p className="text-muted">
                        No dudes en contactarnos si necesitas ayuda con tu reserva
                    </p>
                </div>

                {/* IZQUIERDA: GRID */}
                <div className="col-12 col-lg-6 order-2 order-lg-1 mb-4 mb-lg-0">
                    <div className="row g-4">

                        {/* CARDS DINÁMICAS */}
                        {contacts.map((contact, index) => (
                            <div key={index} className="col-12 col-sm-6 d-flex">
                                <div className="bg-light p-4 rounded w-100 text-center d-flex flex-column align-items-center justify-content-center">

                                    {/* ICONO */}
                                    <div
                                        className="d-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                            borderRadius: "50%",
                                            backgroundColor: "#6c757d",
                                            border: "3px solid white",
                                            color: "white",
                                            fontSize: "28px"
                                        }}
                                    >
                                        {contact.icon}
                                    </div>

                                    {/* NOMBRE */}
                                    <div className="fw-bold mb-1">
                                        {contact.name}
                                    </div>

                                    {/* INFO */}
                                    <div className="text-muted small">
                                        {contact.information}
                                    </div>

                                </div>
                            </div>
                        ))}

                        {/* ÚLTIMA CARD (REDES) */}
                        {contacts.length % 2 !== 0 && (
                            <div className="col-12 col-sm-6 d-flex">
                                <div className="bg-light p-4 rounded w-100 text-center d-flex flex-column align-items-center justify-content-center">

                                    <div
                                        className="d-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                            borderRadius: "50%",
                                            backgroundColor: "#6c757d",
                                            border: "3px solid white",
                                            color: "white",
                                            fontSize: "26px"
                                        }}
                                    >
                                        <FaWhatsapp />
                                    </div>

                                    <div className="fw-bold mb-2">
                                        Contáctanos
                                    </div>

                                    <div className="text-muted small mb-3">
                                        Contáctanos si necesitas realizar una reserva o para cualquier información adicional
                                    </div>

                                    <div className="d-flex gap-3">
                                        <a href="#" className="text-decoration-none text-dark fs-5">
                                            <FaFacebookF />
                                        </a>
                                        <a href="#" className="text-decoration-none text-dark fs-5">
                                            <FaInstagram />
                                        </a>
                                        <a href="#" className="text-decoration-none text-dark fs-5">
                                            <FaWhatsapp />
                                        </a>
                                    </div>

                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* DERECHA: MAPA */}
                <div className="col-12 col-lg-6 order-1 order-lg-2">
                    <div
                        className="w-100 rounded overflow-hidden"
                        style={{ minHeight: "320px", height: "100%" }}
                    >
                        <iframe
                            title="mapa"
                            className="w-100 h-100 border-0"
                            src="https://www.google.com/maps?q=Av.%20Monterrey%20729%20Col.%20Anahuac&output=embed"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ContactSection