import { useEffect, useReducer } from "react"
import Layout from "../../components/layout/layout"
import ContactSection from "./sections/contact-section/page"
import OffersSection from "./sections/offers-section/offers"
import RoomsSection from "./sections/rooms-section/rooms-section"
import ServicesSection from "./sections/services-section/services"
import WelcomeSection from "./sections/welcome-section/welcome-section"
import { HOME_ACTIONS, HomeState, reducer } from "./reducer/reducer"
import ApiConsumer from "../../services/api_consumer"
import { dummyOffers, dummyRooms } from "./dummy_data"
import RoomModal from "./modals/room_data_modal"

const Availability = new ApiConsumer({ url: 'availability/' })
// const Rooms = new ApiConsumer({ url: 'rooms/' })
// const Offers = new ApiConsumer({ url: 'offers/' })

const HomePage = () => {
    const [state, dispatch] = useReducer(reducer, HomeState);

    useEffect(() => {
        if (!state.loading) return;
        changeValue("offers", dummyOffers)
        changeValue("rooms", dummyRooms)
        changeValue('loading', false)
    }, [state.loading])


    useEffect(() => {
        fetchOccupiedDates(state?.reserve_bar.selected_room)
    }, [state.reserve_bar.selected_room])


    const changeValue = (prop: string, data: any) => {
        dispatch({
            type: HOME_ACTIONS.CHANGE_VALUE,
            payload: {
                prop,
                data
            }
        })
    }

    // const changeValueReserveBar = (prop: string, data: any) => {
    //     dispatch({
    //         type: HOME_ACTIONS.CHANGE_VALUE_RESERVE_BAR,
    //         payload: {
    //             prop,
    //             data
    //         }
    //     })
    // }

    const fetchOccupiedDates = async (room_number: string | undefined) => {
        try {

            const { status, data } = room_number ? await Availability.getById(room_number) : await Availability.getAll()

            if (status) {
                dispatch({
                    type: HOME_ACTIONS.GET_OCCUPIED_DATES,
                    payload: data.data.occupiedDates
                })
            }
        } catch (e) {
            console.error(e)
        }
    }

    // const fetchOffers = async () => {
    //     try {
    //         const { data, status } = await Offers.getAll();
    //         if (status) {
    //             const parsedData = data.data.map((offer: any) => {
    //                 try {
    //                     return {
    //                         ...offer,
    //                         images: JSON.parse(offer.images),
    //                     };
    //                 } catch (error) {
    //                     console.error("Error al parsear las imágenes:", error);
    //                     return {
    //                         ...offer,
    //                         images: [],
    //                     };
    //                 }
    //             });

    //             changeValue('offers', parsedData)

    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // const getAllRooms = async () => {
    //     try {
    //         const { status, data } = await Rooms.getAll()
    //         if (status) {
    //             const parsedData = data.data.map((room: any) => {
    //                 try {
    //                     return {
    //                         ...room,
    //                         images: JSON.parse(room.images),
    //                     };
    //                 } catch (error) {
    //                     console.error("Error al parsear las imágenes:", error);
    //                     return {
    //                         ...room,
    //                         images: [],
    //                     };
    //                 }
    //             });
    //             changeValue('rooms', parsedData)
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    return (
        <Layout>
            <WelcomeSection state={state} dispatch={dispatch} />
            <RoomsSection state={state} dispatch={dispatch} />
            <ServicesSection />
            <OffersSection state={state} />
            <ContactSection />

            <RoomModal
                room={state?.room_modal}
                mainImage={state!.main_image}
                switchMainImage={(img) => changeValue('main_image', img)}
                onClose={() => changeValue('room_modal', null)}
            />
        </Layout>
    )
}

export default HomePage