import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa"
import { ContactCardProp } from "./contact-card-props"
import { useRef } from "react"
import './styles.css'


function ContactSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null)


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
        <section className="contactSectionPremium" id="contacto" ref={sectionRef}>
            <div className="contactContainer">

                {/* HEADER */}
                <div className="contactHeader">
                    <span className="contactTag">HGEN SUITES</span>
                    <h2 className="contactTitle">Contáctanos</h2>
                    <p className="contactSubtitle">
                        Estamos disponibles para ayudarte con tu reserva o cualquier consulta.
                    </p>
                </div>

                <div className="contactContent">

                    {/* IZQUIERDA: INFO */}
                    <div className="contactInfo">

                        <div className="contactGrid">

                            {contacts.map((contact, index) => (
                                <div key={index} className="contactCard">

                                    <div className="contactIcon">
                                        {contact.icon}
                                    </div>

                                    <h4 className="contactCardTitle">
                                        {contact.name}
                                    </h4>

                                    <p className="contactCardText">
                                        {contact.information}
                                    </p>

                                </div>
                            ))}

                            {contacts.length % 2 !== 0 && (
                                <div className="contactCard socialCard">

                                    <h4 className="contactCardTitle">
                                        Síguenos
                                    </h4>

                                    <p className="contactCardText">
                                        Mantente conectado con nosotros en redes sociales
                                    </p>

                                    <div className="contactSocials">
                                        <a href="#"><FaFacebookF /></a>
                                        <a href="#"><FaInstagram /></a>
                                        <a href="#"><FaWhatsapp /></a>
                                    </div>

                                </div>
                            )}

                        </div>
                    </div>

                    {/* DERECHA: MAPA */}
                    <div className="contactMap">
                        <iframe
                            title="HGEN Rooms & Suites Los Mochis"
                            loading="lazy"
                            allowFullScreen
                            src="https://www.google.com/maps?q=HGEN+ROOMS+%26+SUITES+LOS+MOCHIS&output=embed"
                        />
                    </div>

                </div>

            </div>
        </section>

    )
}

export default ContactSection