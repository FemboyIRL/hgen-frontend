import { useRef } from "react";
import "./rooms-sections.css";
import useVisibility from "../../../../hooks/useVisibility";
import useRooms from "../../../../hooks/useRooms";
import LoadingSpinnerContainer from "../../../../components/LoadingSpinner/loading-spinner";

const RoomsSection = () => {
    const sectionRef = useRef<HTMLElement | null>(null)
    const isVisible = useVisibility(sectionRef, "-50px")

    const { rooms, loading, error } = useRooms();

    if (loading) return <LoadingSpinnerContainer />

    if (error) return <></>

    return (
        <section
            className="habitaciones-seccion"
            id="habitaciones"
            ref={sectionRef}
        >
            <div className="contenedor">
                <h2 className="section-title">Nuestras Habitaciones</h2>
                <div className="habitaciones-lista">
                    {rooms.length === 0 ? (
                        <p>No hay habitaciones disponibles.</p>
                    ) : (
                        rooms.map((habitacion) => (
                            <>
                                <div className={`habitacion ${isVisible ? "visible" : ""}`}>
                                    <img
                                        src={habitacion.images[0]}
                                        alt={habitacion.room_number}
                                        className="imagen-habitacion"
                                    />
                                    <h3 className="titulo-habitacion">Habitación {habitacion.room_number}</h3>
                                    <p className="descripcion-habitacion">{habitacion.description}</p>
                                    <p className="precio-habitacion">{"$700 p/n"}</p>
                                </div>
                            </>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default RoomsSection;