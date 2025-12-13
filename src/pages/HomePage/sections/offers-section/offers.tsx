import './offers.css'
import ApiConsumer from '../../../../services/api_consumer'
import { Offer } from '../../../../types/offer'
import { useEffect, useState } from 'react'
import LoadingSpinnerContainer from '../../../../components/LoadingSpinner/loading-spinner'

const Offers = new ApiConsumer({ url: 'offers/' })

const OffersSection = () => {
    const [offers, setOffers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getOffers()
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
                setLoading(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="offersContainer p-5">
            <div className="title text-center fs-1 fw-bold">
                Ofertas
            </div>
            <div className="contents-container d-flex gap-5 flex-column justify-content-center align-items-center mt-5">
                {
                    loading ? (<LoadingSpinnerContainer />) : (<></>)
                }
                {
                    offers.length === 0 ? (<>
                        <div className="empty-offers">
                            La lista de ofertas se encuentra vacias
                        </div>
                    </>) : (<>
                        {
                            offers.map((offer: Offer, index: number) => (
                                <div
                                    className={`content mt-2 d-flex gap-3 flex-wrap ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}
                                    key={String(index)}
                                >
                                    <div className="content-image d-flex justify-content-center align-items-center flex-grow-1 ">
                                        <img src={offer.images[0]} alt="papu" />
                                    </div>
                                    <div className="content-text w-50 d-flex gap-5 flex-column p-5 flex-grow-1 offer-background">
                                        <div className="title text-center fs-2 p-3">{offer.title}</div>
                                        <div className="description px-5">{offer.description}</div>
                                        <div className="prices d-flex justify-content-evenly my-3 flex-wrap">
                                            <div className="old-price"><del>{offer.original_price}</del></div>
                                            <div className="discount-price "><mark>{offer.discount_price}</mark></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </>)
                }
            </div>
        </div>
    )
}

export default OffersSection