import { Room } from "../../../types/room";

const initialState = {
    loading: true,
    roomModal: false,
    deleteRoomModal: false,
    rooms: [] as Room[],
    searchTerm: '',
    formData: {
        room_number: '',
        type: '',
        is_available: true,
        description: '',
        images: [],
    },
    currentRoom: null as Room | null,
};

export default initialState

export type RoomReducer = typeof initialState