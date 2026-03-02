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

const RoomsSection: React.FC<RoomsSectionProps> = ({ state, dispatch}) => {
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

    console.log(state.room_modal)

    return (
        <div className="my-4 w-full text-center" id="habitaciones" ref={sectionRef}>
            <h2 className="title text-center mx-auto">Nuestras Habitaciones</h2>
            <div className="row m-0">
                {state!.rooms.length === 0 ? (
                    <p>No hay habitaciones disponibles.</p>
                ) : state!.loading ? <LoadingSpinnerContainer /> : (
                    state!.rooms.map((habitacion: Room) => (
                        <div className="center col-12 col-md-4 py-3">
                            <RoomCard room={habitacion} showRoomModal={showRoomModal} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RoomsSection;