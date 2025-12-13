import { Room } from "../../../../../types/room"

const RoomCard = ({ room, showRoomData }: { room: Room, showRoomData?: () => void }) => {
    return (
        <div className="card align-items-center" onClick={showRoomData} key={room.room_number}>
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