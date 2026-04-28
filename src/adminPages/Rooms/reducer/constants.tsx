import { Room } from "../../../types/room";

const initialState = {
    loading: true,
    roomModal: false,
    deleteRoomModal: false,
    rooms: [] as Room[],
    searchTerm: '',
    formData: {
        // Información básica
        room_number: '',
        type: '',                // Ej: "Suite", "Doble", "Familiar"
        description: '',
        images: [] as string[],

        // Capacidad y comodidades
        beds: 1,                 // Número de camas
        capacity: 2,             // Capacidad máxima de personas
        amenities: [] as string[], // Ej: ["WiFi", "TV", "Aire acondicionado", "Minibar"]

        // Características adicionales (opcionales)
        size: undefined as string | undefined,         // Tamaño en metros cuadrados
        bed_type: undefined as string | undefined,     // Ej: "King size", "Queen size", "Individual"

        // Estado y disponibilidad
        floor: undefined as string | undefined,        // Número de piso
        features: [] as string[], // Características especiales
    },
    currentRoom: null as Room | null,
};

export default initialState

export type RoomReducer = typeof initialState