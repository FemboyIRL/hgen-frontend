import { ReactNode } from "react"
import { Calendar, CarFront, Cup, EggFried, TaxiFront, Wifi } from "react-bootstrap-icons"
import './services.css'

interface Service {
    icono: ReactNode
    titulo: string
    descripcion: string
}

const ServicesSection = () => {
    const services: Service[] = [
        {
            icono: <Wifi />,
            titulo: 'Wi-Fi Gratuito',
            descripcion: 'Disfruta de conexión a internet de alta velocidad en todas las habitaciones.'
        },
        {
            icono: <CarFront />,
            titulo: 'Estacionamiento',
            descripcion: 'Contamos con estacionamiento privado y seguro para nuestros huéspedes.'
        },
        {
            icono: <EggFried />,
            titulo: 'Servicio de Alimentos',
            descripcion: 'Ofrecemos servicios de alimentos de 8 a.m. a 10 p.m. para tu comodidad.'
        },
        {
            icono: <Calendar />,
            titulo: 'Tours y Traslados',
            descripcion: 'Ofrecemos traslados ejecutivos y tours por la ciudad, el puerto de Topolobampo, Maviri y El Fuerte.'
        },
        {
            icono: <Cup />,
            titulo: 'Desayuno Incluido',
            descripcion: 'Disfruta de un delicioso desayuno incluido con tu estancia.'
        },
        {
            icono: <TaxiFront />,
            titulo: 'Servicio de Traslados Ejecutivos',
            descripcion: 'Disponemos de un servicio de traslados ejecutivos para tu comodidad.'
        }
    ]


    return (
        <section className="servicesSection" id="servicios">
            <div className="servicesOverlay" />

            <div className="servicesContent">
                <div className="servicesHeader">
                    <span className="servicesTag">HGEN EXPERIENCE</span>
                    <h2 className="servicesTitle">Nuestros Servicios</h2>
                    <p className="servicesSubtitle">
                        Comodidades diseñadas para una estancia excepcional
                    </p>
                </div>

                <div className="servicesGrid">
                    {services.map((service, index) => (
                        <div className="serviceCard" key={index}>
                            <div className="serviceIconWrapper">
                                <div className="serviceIcon">
                                    {service.icono}
                                </div>
                            </div>

                            <h3 className="serviceTitle">
                                {service.titulo}
                            </h3>

                            <p className="serviceDescription">
                                {service.descripcion}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServicesSection