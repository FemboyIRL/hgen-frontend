import { Room } from "../../../../../types/room";
import './room-card.css'

interface Props {
    room: Room;
    showRoomModal: (room: Room) => void;
}

const RoomCard = ({ room, showRoomModal }: Props) => {
    const mainImage = room.images?.[0];

    return (
        <div
            className="room-card-pro"
            onClick={() => showRoomModal(room)}
        >
            <div className="room-card-pro-img">
                <img src={mainImage} alt={`Habitación ${room.room_number}`} />

                {/* Overlay oscuro */}
                <div className="room-card-pro-overlay" />

                {/* Número de habitación */}
                <div className="room-card-pro-number">
                    #{room.room_number}
                </div>

                {/* Tipo */}
                <div className="room-card-pro-type">
                    {room.type}
                </div>
            </div>

            {/* Panel inferior */}
            <div className="room-card-pro-body">
                <h3>Habitación {room.room_number}</h3>

                <p className="room-card-pro-desc">
                    {room.description}
                </p>

                <div className="room-card-pro-action">
                    <span>Ver detalles</span>
                    <i className="bi bi-arrow-right"></i>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;