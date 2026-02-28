import { useEffect, useReducer, useRef } from "react";
import "./rooms-sections.css";
import LoadingSpinnerContainer from "../../../../components/LoadingSpinner/loading-spinner";
import initialState from "../../../../adminPages/Rooms/reducer/constants";
import ApiConsumer from "../../../../services/api_consumer";
import { reducer, roomsActions } from "../../../../adminPages/Rooms/reducer/reducer";
import { Room } from "../../../../types/room";
import RoomCard from "./components/room-card";
import { dummyRooms } from "../../dummy_data";

const Rooms = new ApiConsumer({ url: 'rooms/' })

const RoomsSection = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const sectionRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        getAllRooms()
        if (state?.rooms.length === 0) {
            dispatch({
                type: roomsActions.LOADED_ROOMS_LIST,
                payload: dummyRooms
            })
        }
    }, [state?.loading])

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
        <div className="my-4 w-full text-center" id="habitaciones" ref={sectionRef}>
            <h2 className="title text-center mx-auto">Nuestras Habitaciones</h2>
            <div className="row m-0">
                {state!.rooms.length === 0 ? (
                    <p>No hay habitaciones disponibles.</p>
                ) : state!.loading ? <LoadingSpinnerContainer /> : (
                    state!.rooms.map((habitacion: Room) => (
                        <div className="center col-12 col-md-4 py-3">
                            <RoomCard room={habitacion} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RoomsSection;