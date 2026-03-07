
import { useState, useEffect } from "react";
import './welcome-section.css'
import ReservaBar from "./reserve-bar/reserve-bar";
import { Calendar2CheckFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HomeReducer } from "../../reducer/constants";

interface WelcomeSectionProps {
    state: HomeReducer,
    dispatch: React.Dispatch<{
        type: string,
        payload: any
    }>;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ state, dispatch }) => {
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const navigate = useNavigate();

    const images = [
        "url(/assets/images/hgen-front-view.jpeg)",
        "url(/assets/images/hgen-view.jpg)",
        "url(/assets/images/hgen-front.jpg)",
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setBackgroundIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(intervalId);
    });

    const handleSubmit = () => {
        if (!state.reserve_bar.date_range[0] || !state.reserve_bar.date_range[1]) {
            toast.error("Por favor, selecciona las fechas de check-in y check-out.");
            return;
        }
        navigate("/Reservation");
    };

    return (
        <section
            className="hero-section"
            id="home"
            style={{ backgroundImage: images[backgroundIndex] }}
        >

            <div className="hero-overlay" />

            <div className="hero-content">

                <h1 className="hero-title">
                    Bienvenido a Hgen Suites
                </h1>

                <p className="hero-subtitle">
                    Comfort, estilo y atención personalizada para tu estancia
                </p>

                <div className="hero-booking-box">

                    <span className="hero-booking-title">
                        Check In / Check Out
                    </span>

                    <ReservaBar
                        state={state}
                        dispatch={dispatch}
                    />

                </div>

            </div>

        </section>
    );
};

export default WelcomeSection;
