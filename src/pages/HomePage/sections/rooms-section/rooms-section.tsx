import { useRef } from "react";
import "./rooms_section.css";
import CardRoom from "./card.room";
import useVisibility from "../../../../hooks/useVisibility";
import useRooms from "../../../hooks/useRooms";

const RoomsSection = () => {
    const sectionRef = useRef(null);
    const isVisible = useVisibility(sectionRef, "-50px");

    const { rooms } = useRooms();

    console.log(rooms);

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
                            <CardRoom
                                key={habitacion._id}
                                imagen={"localhost:5000" + habitacion.image}
                                titulo={habitacion.room_number}
                                descripcion={habitacion.description}
                                precio={"$700"}
                                isVisible={isVisible}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default RoomsSection;