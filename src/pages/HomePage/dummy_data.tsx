import { Offer } from "../../types/offer";
import { Room } from "../../types/room";

export const dummyRooms: Room[] = [
    {
        room_number: "101",
        type: "Deluxe Suite",
        description: "Amplia habitación con vista al mar",
        is_available: true,
        images: [
            "https://picsum.photos/600/400?random=1",
            "https://picsum.photos/600/400?random=2",
        ],
    },
    {
        room_number: "202",
        type: "Standard Room",
        description: "Cómoda habitación para dos personas",
        is_available: false,
        images: [
            "https://picsum.photos/600/400?random=3",
        ],
    },
    {
        room_number: "303",
        type: "Presidential Suite",
        description: "Suite premium con jacuzzi privado",
        is_available: true,
        images: [
            "https://picsum.photos/600/400?random=4",
            "https://picsum.photos/600/400?random=5",
        ],
    },
];

export const dummyOffers: Offer[] = [
    {
        id: "offer-1",
        title: "Escapada de Fin de Semana",
        description:
            "Disfruta dos noches en una habitación deluxe con desayuno incluido.",
        images: [
            "https://picsum.photos/800/500?random=11",
            "https://picsum.photos/800/500?random=12",
        ],
        original_price: 3200,
        discount_price: 2499,
    },
    {
        id: "offer-2",
        title: "Paquete Familiar",
        description:
            "Habitación familiar + acceso a alberca y actividades para niños.",
        images: [
            "https://picsum.photos/800/500?random=21",
            "https://picsum.photos/800/500?random=22",
            "https://picsum.photos/800/500?random=23",
        ],
        original_price: 4500,
        discount_price: 3899,
    },
    {
        id: "offer-3",
        title: "Suite Premium",
        description: "Suite con jacuzzi privado y vista panorámica.",
        images: ["https://picsum.photos/800/500?random=31"],
        original_price: 7800,
        discount_price: 6499,
    },
    {
        id: "offer-4",
        title: "Oferta Anticipada",
        description: "Reserva con anticipación y obtén un descuento exclusivo.",
        images: [
            "https://picsum.photos/800/500?random=41",
            "https://picsum.photos/800/500?random=42",
        ],
        original_price: 2800,
        discount_price: 2199,
    },
];