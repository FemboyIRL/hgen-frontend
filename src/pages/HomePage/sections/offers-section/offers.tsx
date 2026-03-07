import "./offers.css";
import { Offer } from "../../../../types/offer";
import LoadingSpinnerContainer from "../../../../components/LoadingSpinner/loading-spinner";
import { HomeReducer } from "../../reducer/constants";
import { useRef } from "react";
import OfferCard from "./offer_card/offer_card";

interface OfferSectionProps {
    state: HomeReducer
}

const OffersSection: React.FC<OfferSectionProps> = ({ state }) => {
    const sectionRef = useRef<HTMLDivElement | null>(null)

    const carouselRef = useRef<HTMLDivElement | null>(null);

    const scroll = (direction: "left" | "right") => {
        if (!carouselRef.current) return;

        const scrollAmount = 380; // ancho aproximado de card
        carouselRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <section className="offersSectionPremium" id="ofertas" ref={sectionRef}>
            <div className="offersContainer">

                <div className="offersHeaderPremium">
                    <span className="offersTag">HGEN DEALS</span>
                    <h2 className="offersTitle">Ofertas Exclusivas</h2>
                    <p className="offersSubtitle">
                        Promociones diseñadas para una experiencia única
                    </p>
                </div>

                {state.loading ? (
                    <div className="offersLoading">
                        <LoadingSpinnerContainer />
                    </div>
                ) : state.offers.length === 0 ? (
                    <div className="offersEmptyPremium">
                        <h3>No hay ofertas disponibles</h3>
                        <p>Pronto tendremos nuevas promociones</p>
                    </div>
                ) : (
                    <div className="offersCarouselWrapper">

                        <button
                            className="carouselBtn left"
                            onClick={() => scroll("left")}
                        >
                            ‹
                        </button>

                        <div className="offersCarousel" ref={carouselRef}>
                            {state.offers.map((offer: Offer, index: number) => (
                                <div className="offerSlide" key={index}>
                                    <OfferCard offer={offer} index={index} />
                                </div>
                            ))}
                        </div>

                        <button
                            className="carouselBtn right"
                            onClick={() => scroll("right")}
                        >
                            ›
                        </button>

                    </div>
                )}

            </div>
        </section>
    );
};

export default OffersSection;
