import { useRef } from "react";
import "./rooms-sections.css";
import LoadingSpinnerContainer from "../../../../components/LoadingSpinner/loading-spinner";
import { Room } from "../../../../types/room";
import RoomCard from "./components/room-card";
import { HomeReducer } from "../../reducer/constants";
import HOME_ACTIONS from "../../reducer/actions";

interface RoomsSectionProps {
    state: HomeReducer
    dispatch: React.Dispatch<{
        type: string,
        payload: any
    }>
}

const RoomsSection: React.FC<RoomsSectionProps> = ({ state, dispatch }) => {
    const sectionRef = useRef<HTMLDivElement | null>(null)

    const showRoomModal = (room: Room) => {
        dispatch({
            type: HOME_ACTIONS.CHANGE_VALUE,
            payload: {
                prop: "room_modal",
                data: room
            }
        })
        dispatch({
            type: HOME_ACTIONS.CHANGE_VALUE,
            payload: {
                prop: "main_image",
                data: room.images[0]
            }
        })
    }

    return (
        <section
            className="rooms-section-parallax"
            id="habitaciones"
            ref={sectionRef}
        >
            {/* Fondo Parallax */}
            <div className="rooms-parallax-bg" />

            {/* Overlay */}
            <div className="rooms-overlay" />

            {/* Contenido */}
            <div className="rooms-content">

                <div className="rooms-header">
                    <span className="rooms-tag">HGEN SUITES</span>
                    <h2 className="rooms-title">
                        Nuestras Habitaciones
                    </h2>
                    <p className="rooms-subtitle">
                        Diseño, confort y elegancia pensados para tu descanso
                    </p>
                </div>

                {state!.loading ? (
                    <div className="rooms-loading">
                        <LoadingSpinnerContainer />
                    </div>
                ) : state!.rooms.length === 0 ? (
                    <div className="rooms-empty">
                        <h4>No hay habitaciones disponibles</h4>
                        <p>Pronto tendremos nuevas opciones para ti.</p>
                    </div>
                ) : (
                    <div className="rooms-grid">
                        {state!.rooms.map((habitacion: Room) => (
                            <RoomCard
                                key={habitacion.room_number}
                                room={habitacion}
                                showRoomModal={showRoomModal}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default RoomsSection;