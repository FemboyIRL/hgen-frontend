
import { useState, useEffect } from "react";
import './welcome-section.css'
import ReservaBar from "./reserve-bar/reserve-bar";

const WelcomeSection = () => {
    const [backgroundIndex, setBackgroundIndex] = useState(0);

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
    }, []);

    return (
        <section
            className="primera-seccion"
            id="home"
            style={{ backgroundImage: images[backgroundIndex] }}
        >
            {" "}
            <div className="overlay" />
            <div className="content">
                <h1 className="titulo">Bienvenido a Hgen Suites</h1>
                <p className="subtitulo">
                    Confort, estilo y atención personalizada para tu estancia.
                </p>
                <ReservaBar />
            </div>
        </section>
    );
};

export default WelcomeSection;
