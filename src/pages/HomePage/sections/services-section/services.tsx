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
        <>
            <div className="servicesContainer" id="servicios">
                <div className="servicesCards">
                    {services.map((service, index) => (
                        <div className="serviceCard" key={index}>
                            <div className="serviceIcon">
                                {service.icono}
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

        </>
    )
}

export default ServicesSection