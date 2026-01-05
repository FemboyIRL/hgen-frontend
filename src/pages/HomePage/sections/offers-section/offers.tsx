import './offers.css'
import ApiConsumer from '../../../../services/api_consumer'
import { Offer } from '../../../../types/offer'
import { useEffect, useState } from 'react'
import LoadingSpinnerContainer from '../../../../components/LoadingSpinner/loading-spinner'

const Offers = new ApiConsumer({ url: 'offers/' })

const OffersSection = () => {
    const [offers, setOffers] = useState<Offer[]>([])
    const [loading, setLoading] = useState(true)
    const dummyOffers: Offer[] = [
        {
            id: "offer-1",
            title: "Escapada de Fin de Semana",
            description: "Disfruta dos noches en una habitación deluxe con desayuno incluido.",
            images: [
                "https://picsum.photos/800/500?random=11",
                "https://picsum.photos/800/500?random=12",
            ],
            original_price: new Float64Array([3200]),
            discount_price: new Float64Array([2499]),
        },
        {
            id: "offer-2",
            title: "Paquete Familiar",
            description: "Habitación familiar + acceso a alberca y actividades para niños.",
            images: [
                "https://picsum.photos/800/500?random=21",
                "https://picsum.photos/800/500?random=22",
                "https://picsum.photos/800/500?random=23",
            ],
            original_price: new Float64Array([4500]),
            discount_price: new Float64Array([3899]),
        },
        {
            id: "offer-3",
            title: "Suite Premium",
            description: "Suite con jacuzzi privado y vista panorámica.",
            images: [
                "https://picsum.photos/800/500?random=31",
            ],
            original_price: new Float64Array([7800]),
            discount_price: new Float64Array([6499]),
        },
        {
            id: "offer-4",
            title: "Oferta Anticipada",
            description: "Reserva con anticipación y obtén un descuento exclusivo.",
            images: [
                "https://picsum.photos/800/500?random=41",
                "https://picsum.photos/800/500?random=42",
            ],
            original_price: new Float64Array([2800]),
            discount_price: new Float64Array([2199]),
        },
    ];


    useEffect(() => {
        getOffers()
        if (offers.length === 0) {
            setOffers(dummyOffers)
        }
        setLoading(false)
    }, [loading])

    const getOffers = async () => {
        try {
            const { data, status } = await Offers.getAll()
            if (status) {
                const parsedData = data.data.map((offer: any) => {
                    try {
                        return {
                            ...offer,
                            images: JSON.parse(offer.images),
                        };
                    } catch (error) {
                        console.error("Error al parsear las imágenes:", error);
                        return {
                            ...offer,
                            images: [],
                        };
                    }
                });
                setOffers(parsedData)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="offersContainer p-5 w-full bg-light">
            <div className="title text-center mb-5">
                <h1 className="fw-bold display-5 text-primary">Ofertas Exclusivas</h1>
                <p className="text-muted">Descubre las mejores promociones para tu próxima estadía</p>
            </div>

            <div className="contents-container mt-5">
                {
                    loading ? (
                        <div className="d-flex justify-content-center py-5">
                            <LoadingSpinnerContainer />
                        </div>
                    ) : offers.length === 0 ? (
                        <div className="empty-offers text-center py-5">
                            <div className="icon mb-3">
                                <i className="bi bi-calendar-x display-1 text-muted"></i>
                            </div>
                            <h3 className="text-secondary">No hay ofertas disponibles</h3>
                            <p className="text-muted">Pronto tendremos nuevas promociones para ti</p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {
                                offers.map((offer: Offer, index: number) => (
                                    <div className="col-12 d-flex justify-content-center" key={offer.id || index}>
                                        <div className="card offer-card border-0 shadow-sm overflow-hidden h-100">
                                            <div className="row g-0 h-100">
                                                {/* Imagen */}
                                                <div className="col-md-5 position-relative">
                                                    <img
                                                        src={offer.images[0]}
                                                        className="img-fluid h-100 w-100 object-fit-cover"
                                                        alt={offer.title}
                                                        style={{ minHeight: '250px' }}
                                                    />
                                                    <div className="position-absolute top-0 end-0 m-3">
                                                        <span className="badge bg-danger px-3 py-2">
                                                            <i className="bi bi-percent me-1"></i>
                                                            {Math.round((offer.original_price - offer.discount_price) / offer.original_price * 100)}% OFF
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Contenido */}
                                                <div className="col-md-7">
                                                    <div className="card-body p-4 h-100 d-flex flex-column">
                                                        {/* Header con título y rating */}
                                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                                            <div>
                                                                <h3 className="card-title fw-bold text-dark mb-2">
                                                                    {offer.title}
                                                                </h3>
                                                                <div className="d-flex align-items-center mb-2">
                                                                    <span className="text-warning me-1">
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star-half"></i>
                                                                    </span>
                                                                    <span className="text-muted ms-1">(4.5)</span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <span className="badge bg-success px-3 py-2">
                                                                    <i className="bi bi-check-circle me-1"></i>
                                                                    Cancelación gratis
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Descripción */}
                                                        <div className="description mb-4 flex-grow-1">
                                                            <p className="text-muted mb-0">{offer.description}</p>
                                                            <div className="mt-3">
                                                                <span className="badge bg-light text-dark me-2 border">
                                                                    <i className="bi bi-wifi me-1"></i>WiFi gratis
                                                                </span>
                                                                <span className="badge bg-light text-dark me-2 border">
                                                                    <i className="bi bi-cup-hot me-1"></i>Desayuno incluido
                                                                </span>
                                                                <span className="badge bg-light text-dark border">
                                                                    <i className="bi bi-parking me-1"></i>Estacionamiento
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Footer con precios y botón */}
                                                        <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                                                            <div className="prices">
                                                                <div className="d-flex align-items-baseline">
                                                                    <div className="old-price text-muted me-3">
                                                                        <del className="fs-5">${offer.original_price}</del>
                                                                    </div>
                                                                    <div className="discount-price">
                                                                        <span className="display-6 fw-bold text-primary">
                                                                            ${offer.discount_price}
                                                                        </span>
                                                                        <span className="text-muted ms-2">/noche</span>
                                                                    </div>
                                                                </div>
                                                                <small className="text-success">
                                                                    <i className="bi bi-info-circle me-1"></i>
                                                                    Impuestos y cargos incluidos
                                                                </small>
                                                            </div>
                                                            <div className="action-buttons">
                                                                <button className="btn btn-primary px-4 py-2">
                                                                    <i className="bi bi-calendar-check me-2"></i>
                                                                    Reservar ahora
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default OffersSection