import { useEffect, useReducer, useRef } from "react";
import "./rooms-sections.css";
import useVisibility from "../../../../hooks/useVisibility";
import LoadingSpinnerContainer from "../../../../components/LoadingSpinner/loading-spinner";
import initialState from "../../../../adminPages/Rooms/reducer/constants";
import ApiConsumer from "../../../../services/api_consumer";
import { reducer, roomsActions } from "../../../../adminPages/Rooms/reducer/reducer";
import { Room } from "../../../../interfaces/RoomInterface";

const Rooms = new ApiConsumer({ url: 'rooms/' })

const RoomsSection = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const sectionRef = useRef<HTMLElement | null>(null)
    const isVisible = useVisibility(sectionRef, "-50px")

    useEffect(() => {
        getAllRooms()
    }, [state.loading])

    const getAllRooms = async () => {
        try {
            const { status, data } = await Rooms.getAll()
            if (status) {
                const parsedData = data.data.map((room: any) => {
                    try {
                        return {
                            ...room,
                            images: JSON.parse(room.images),
                        };
                    } catch (error) {
                        console.error("Error al parsear las imágenes:", error);
                        return {
                            ...room,
                            images: [],
                        };
                    }
                });
                dispatch({
                    type: roomsActions.LOADED_ROOMS_LIST,
                    payload: parsedData
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <section
            className="habitaciones-seccion"
            id="habitaciones"
            ref={sectionRef}
        >
            <div className="contenedor">
                <h2 className="section-title">Nuestras Habitaciones</h2>
                <div className="habitaciones-lista">
                    {state.rooms.length === 0 ? (
                        <p>No hay habitaciones disponibles.</p>
                    ) : state.loading ? <LoadingSpinnerContainer /> : (
                        state.rooms.map((habitacion: Room) => (
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