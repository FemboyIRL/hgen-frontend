import Layout from "../../components/layout/layout"
import RoomsSection from "./sections/rooms-section/rooms-section"
import WelcomeSection from "./sections/welcome-section/welcome-section"

const HomePage = () => {
    return (
        <Layout>
            <WelcomeSection />
            <RoomsSection />
        </Layout>
    )
}

export default HomePage