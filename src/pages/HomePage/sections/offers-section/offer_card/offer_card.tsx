import { Offer } from "../../../../../types/offer"
import './offer_card.css'

interface OfferCardProps {
    offer: Offer
    index: number
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, index }) => {
    return (
        <div className="offerCard" key={offer.id || index}>

            {/* Imagen */}
            <div className="offerImageWrapper">
                <img src={offer.images[0]} alt={offer.title} />

                <div className="offerDiscount">
                    {Math.round(
                        ((offer.original_price - offer.discount_price) /
                            offer.original_price) *
                        100
                    )}% OFF
                </div>
            </div>

            {/* Contenido */}
            <div className="offerContent">

                <h3 className="offerTitle">{offer.title}</h3>

                <div className="offerMeta">
                    <span className="rating">
                        ★★★★☆ <strong>4.5</strong>
                    </span>
                    <span className="freeCancel">
                        Cancelación gratis
                    </span>
                </div>

                <p className="offerDescription">
                    {offer.description}
                </p>

                <div className="offerAmenities">
                    WiFi · Desayuno · Parking
                </div>

                <div className="offerFooter">
                    <div className="offerPrices">
                        <span className="oldPrice">
                            ${offer.original_price}
                        </span>
                        <div>
                            <span className="newPrice">
                                ${offer.discount_price}
                            </span>
                            <span className="perNight">
                                /noche
                            </span>
                        </div>
                    </div>

                    <button className="offerBtn">
                        Reservar
                    </button>
                </div>

            </div>
        </div>
    );
}

export default OfferCard