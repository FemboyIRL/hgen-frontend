import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApiConsumer from '../services/api_consumer'

// Definir el tipo de una habitación (ajusta según la estructura de tus datos)
interface Room {
    id: string
    room_number: string
    type: string
    is_available: boolean
    description: string
    image: string
}


// Crear una instancia de ApiConsumer para las habitaciones
const apiRooms = new ApiConsumer({ url: "/api/rooms/" });

const useRooms = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await apiRooms.getAll();

                if (response.status) {
                    setRooms(response.data);
                } else {
                    setError("Error al obtener las habitaciones");
                    toast.error("Error al obtener las habitaciones");
                    console.error("Error en la respuesta:", response.statusText);
                }
            } catch (err) {
                setError("Error desconocido al obtener las habitaciones");
                toast.error("Error desconocido al obtener las habitaciones");
                console.error("Error en la solicitud:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    return { rooms, loading, error };
};

export default useRooms;