import { useEffect, useReducer } from "react"
import ApiConsumer from "../../services/api_consumer"
import initialState from "./reducer/constants"
import { reducer, offerActions } from "./reducer/reducer"
import { Offer } from "../../types/offer"
import './offers.css'
import { Button, Col, Row } from "react-bootstrap"
import LoadingSpinnerContainer from "../../components/LoadingSpinner/loading-spinner"
import CreateOfferModal from "./modals/offerModal/offerModal"
import DeleteOfferModal from "./modals/deleteModal/deleteOffer"
import { dummyOffers } from "../../pages/HomePage/dummy_data"

const Offers = new ApiConsumer({ url: 'offers/' })

const OffersPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        // getOffers()
        dispatch({
            type: offerActions.LOADED_OFFER_LIST,
            payload: dummyOffers
        })
    }, [state.loading])

    const getOffers = async () => {
        try {
            const { status, data } = await Offers.getAll()
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
                dispatch({
                    type: offerActions.LOADED_OFFER_LIST,
                    payload: parsedData
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    const changeValue = (prop: string, data: any) => {
        dispatch({
            type: offerActions.CHANGE_VALUE,
            payload: {
                prop,
                data
            }
        })
    }

    const selectOffer = (prop: any, data: any, offer: Offer) => {
        changeValue(prop, data)
        changeValue("currentOffer", offer)
    }

    return (
        <>
            <div className="moduleContain">
                <div className="moduleInner">
                    <div className="innerContent">
                        <div className="innerContain">
                            <div className="titleContain">
                                <img src="/assets/icons/icon-door.svg" alt="" width={50} />
                                <div className="title">
                                    <h3>Ofertas</h3>
                                    <p>Lista de ofertas registradas</p>
                                </div>
                            </div>
                            <div className="searchBarContain">
                                <Row style={{ alignItems: "center" }}>
                                    <Col xs="12" sm="7" md="7" lg="7" xl="8">
                                    </Col>
                                    <Col xs="12" sm="5" md="5" lg="5" xl="4">
                                        <Row style={{ justifyContent: "end" }}>
                                            <Button onClick={() => changeValue("offerModal", !state.offerModal)}>
                                                Nueva Oferta
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            {state.loading ? (
                                <LoadingSpinnerContainer />
                            ) : state.offers.length === 0 ? (
                                <p>No se encontraron Ofertas</p>
                            ) : (
                                <>
                                    <div className="admin-cards-container">
                                        <Row className="admin-cards-row">
                                            {state.offers.map((offer: Offer) => (
                                                <Col key={offer.id} xs="12" sm="6" md="4" lg="3" className="admin-card-col">
                                                    <div className="admin-room-card" onClick={() => selectOffer("offerModal", !state?.offerModal, offer)}>
                                                        {/* Imagen principal */}
                                                        <div className="admin-offer-image-wrapper">
                                                            <img
                                                                src={offer.images?.[0] || '/assets/images/no-image.jpg'}
                                                                alt={`Oferta ${offer.title}`}
                                                                className="admin-offer-image"
                                                            />
                                                            {/* Badge de descuento */}
                                                            {offer.original_price > offer.discount_price && (
                                                                <div className="admin-offer-discount-badge">
                                                                    -{Math.round(((offer.original_price - offer.discount_price) / offer.original_price) * 100)}%
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Información principal */}
                                                        <div className="admin-offer-info">
                                                            <div className="admin-offer-header">
                                                                <h4 className="admin-offer-title">{offer.title}</h4>
                                                            </div>

                                                            {/* Descripción */}
                                                            {offer.description && (
                                                                <p className="admin-offer-description">
                                                                    {offer.description.length > 80
                                                                        ? `${offer.description.substring(0, 80)}...`
                                                                        : offer.description}
                                                                </p>
                                                            )}

                                                            {/* Precios */}
                                                            <div className="admin-offer-prices">
                                                                <span className="admin-offer-original-price">
                                                                    ${offer.original_price.toLocaleString()}
                                                                </span>
                                                                <span className="admin-offer-discount-price">
                                                                    ${offer.discount_price.toLocaleString()}
                                                                </span>
                                                            </div>

                                                            {/* Ahorro */}
                                                            {offer.original_price > offer.discount_price && (
                                                                <div className="admin-offer-savings">
                                                                    Ahorras ${(offer.original_price - offer.discount_price).toLocaleString()}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <CreateOfferModal stateReducer={state} dispatch={dispatch} changeModal={() => changeValue('offerModal', !state.offerModal)} />
            <DeleteOfferModal stateReducer={state} dispatch={dispatch} changeModal={() => changeValue('deleteOfferModal', !state.deleteOfferModal)} />
        </>
    )
}

export default OffersPage