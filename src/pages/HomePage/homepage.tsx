import { useReducer } from "react"
import Layout from "../../components/layout/layout"
import ContactSection from "./sections/contact-section/page"
import OffersSection from "./sections/offers-section/offers"
import RoomsSection from "./sections/rooms-section/rooms-section"
import ServicesSection from "./sections/services-section/services"
import WelcomeSection from "./sections/welcome-section/welcome-section"
import { HomeState, reducer } from "./reducer/reducer"
import ApiConsumer from "../../services/api_consumer"

const Availability = new ApiConsumer({ url: 'availability/' })
const Rooms = new ApiConsumer({ url: 'rooms/' })
const Offers = new ApiConsumer({ url: 'offers/' })

const HomePage = () => {
    const [state, dispatch] = useReducer(reducer, HomeState);

    const fetchOccupiedDates = async () => {
        try {
            const { status, data } = await Availability.getAll()

            if (status) {
                dispatch({
                    type: roomSelectionActions.GET_OCCUPIED_DATES,
                    payload: data.data.occupiedDates
                })
            }
        } catch (e) {
            console.error(e)
        }
    }

    


    return (
        <Layout>
            <WelcomeSection state={state} dispatch={dispatch} />
            <RoomsSection />
            <ServicesSection />
            <OffersSection />
            <ContactSection />
        </Layout>
    )
}

export default HomePage