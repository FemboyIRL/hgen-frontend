import Layout from "../../components/layout/layout"
import ContactSection from "./sections/contact-section/page"
import OffersSection from "./sections/offers-section/offers"
import RoomsSection from "./sections/rooms-section/rooms-section"
import ServicesSection from "./sections/services-section/services"
import WelcomeSection from "./sections/welcome-section/welcome-section"

const HomePage = () => {
    return (
        <Layout>
            <WelcomeSection />
            <RoomsSection />
            <ServicesSection />
            <OffersSection />
            <ContactSection />
        </Layout>
    )
}

export default HomePage