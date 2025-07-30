import Layout from "../../components/layout/layout"
// import OffersSection from "./sections/offers-section/offers"
import RoomsSection from "./sections/rooms-section/rooms-section"
import ServicesSection from "./sections/services-section/services"
import WelcomeSection from "./sections/welcome-section/welcome-section"

const HomePage = () => {
    return (
        <Layout>
            <WelcomeSection />
            <RoomsSection />
            <ServicesSection />
            {/* <OffersSection /> */}
        </Layout>
    )
}

export default HomePage