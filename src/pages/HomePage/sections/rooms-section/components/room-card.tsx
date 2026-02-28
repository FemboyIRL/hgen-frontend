import { Room } from "../../../../../types/room"

const RoomCard = ({ room, showRoomModal }: { room: Room, showRoomModal: (room: Room) => void }) => {
    return (
        <div className="card align-items-center" onClick={() => showRoomModal(room)} key={room.room_number}>
            <div className="card-img">
                <img src={room.images[0]} alt={`habitación ${room.room_number}`} />
            </div>
            <div className="card-title fs-2">
                {room.room_number}
            </div>
        </div>
    )
}

export default RoomCard