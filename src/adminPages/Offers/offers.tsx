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

const Offers = new ApiConsumer({ url: 'offers/' })

const OffersPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        getOffers()
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
                                    <Row>
                                        {state.offers.map((Offer: Offer) => (
                                            <Col key={Offer.id} xs="12" sm="6" md="4" lg="3">
                                                <div className="OfferCard" onClick={() => selectOffer("offerModal", !state.offerModal, Offer)}>
                                                    <img
                                                        src={Offer.images[0]}
                                                        alt={`Ofertas ${Offer.title}`}
                                                        className="OfferImage"
                                                    />
                                                    <div className="OfferDetails">
                                                        <h4>{Offer.title}</h4>
                                                        <p>Descripción: {Offer.description}</p>
                                                        <p className="originalPrice"> {Offer.original_price}</p>
                                                        <p className="discountPrice"> {Offer.discount_price}</p>                                                    </div>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
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