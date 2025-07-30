
import { useState, useEffect, useReducer } from "react";
import './welcome-section.css'
import ReservaBar from "./reserve-bar/reserve-bar";
import { Calendar2CheckFill } from "react-bootstrap-icons";
import { reducer, roomSelectionInitial } from "./reducer/reducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const WelcomeSection = () => {
    const [state, dispatch] = useReducer(reducer, roomSelectionInitial)
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
        if (!state.dateRange[0] || !state.dateRange[1]) {
            toast.error("Por favor, selecciona las fechas de check-in y check-out.");
            return;
        }
        navigate("/Reservation");
    };

    return (
        <section
            className="primera-seccion"
            id="home"
            style={{ backgroundImage: images[backgroundIndex] }}
        >
            {" "}
            <div className="overlay" />
            <div className="content d-flex flex-column center">
                <h1 className="titulo">Bienvenido a Hgen Suites</h1>
                <p className="subtitulo">
                    Confort, estilo y atención personalizada para tu estancia.
                </p>
                <div className="p-5 w-75 rounded d-flex flex-column flex-nowrap gap-4 bg-white shadow">
                    <span className="text-dark fs-3 fw-bold"> Check In / Check Out</span>
                    <ReservaBar state={state} dispatch={dispatch} />
                    <div className="reserva-bar-button d-flex justify-content-center py-3">
                        <button
                            type="submit"
                            className="center gap-2 py-3 px-3 border border-0 rounded text-light"
                            onClick={handleSubmit}
                            aria-label="Reservar"
                        >
                            <Calendar2CheckFill />
                            <span>Reservar</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WelcomeSection;
