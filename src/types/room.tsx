export type Room = {
    // Información básica
    room_number: string,
    type: string,                // Ej: "Suite", "Doble", "Familiar"
    description: string,
    images: Array<string>,

    // Capacidad y comodidades
    beds: number,                // Número de camas
    capacity: number,            // Capacidad máxima de personas
    amenities: Array<string>,    // Ej: ["WiFi", "TV", "Aire acondicionado", "Minibar"]

    // Características adicionales
    size?: number,               // Tamaño en metros cuadrados (opcional)
    bed_type?: string,           // Ej: "King size", "Queen size", "Individual"

    // Estado y disponibilidad
    floor?: number,              // Número de piso
    features?: Array<string>,    // Características especiales
}