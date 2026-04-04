import { Customer } from "../../types/customer";
import { Offer } from "../../types/offer";
import { Room } from "../../types/room";

export const dummyRooms: Room[] = [
    {
        room_number: "101",
        type: "Individual",
        description: "Habitación acogedora con cama individual, perfecta para viajeros solitarios",
        images: ["https://picsum.photos/800/500?random=2", "https://picsum.photos/800/500?random=1"],
        beds: 1,
        capacity: 1,
        amenities: ["WiFi", "TV", "Aire acondicionado", "Escritorio"],
        price: 75,
        size: 18,
        bed_type: "Individual",
        floor: 1,
        available: true,
        features: ["Silenciosa", "Cerca del ascensor"]
    },
    {
        room_number: "205",
        type: "Doble",
        description: "Espaciosa habitación con dos camas individuales, ideal para amigos o compañeros",
        images: ["https://picsum.photos/800/500?random=3", "https://picsum.photos/800/500?random=4", "https://picsum.photos/800/500?random=5"],
        beds: 2,
        capacity: 2,
        amenities: ["WiFi", "TV", "Aire acondicionado", "Minibar", "Caja fuerte"],
        price: 120,
        size: 25,
        bed_type: "Individual",
        floor: 2,
        available: true,
        features: ["Balcón", "Bañera"]
    },
    {
        room_number: "310",
        type: "Suite Familiar",
        description: "Amplia suite con cama king size y sofá cama, perfecta para familias",
        images: ["https://picsum.photos/800/500?random=6", "https://picsum.photos/800/500?random=7", "https://picsum.photos/800/500?random=8", "https://picsum.photos/800/500?random=9"],
        beds: 2,  // Una cama king + sofá cama
        capacity: 4,
        amenities: ["WiFi", "TV", "Aire acondicionado", "Minibar", "Caja fuerte", "Chimenea", "Jacuzzi"],
        price: 250,
        size: 45,
        bed_type: "King size",
        floor: 3,
        available: true,
        features: ["Terraza privada", "Sala de estar separada", "Servicio de habitaciones 24h"]
    }
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

export const dummyCustomers: Customer[] = [
    {
      user_id: "usr_001",
      phone: "+1 (555) 123-4567",
      address: "123 Maple Street, Springfield, IL 62701",
      email: "emily.johnson@example.com",
      fullName: "Emily Johnson"
    },
    {
      user_id: "usr_002",
      phone: "+44 7700 900123",
      address: "42 Baker Street, London, W1U 7AJ, UK",
      email: "james.smith@example.co.uk",
      fullName: "James Smith"
    },
    {
      user_id: "usr_003",
      phone: "+61 412 345 678",
      address: "7/89 George Street, Sydney, NSW 2000, Australia",
      email: "mia.wong@example.com.au",
      fullName: "Mia Wong"
    },
    {
      user_id: "usr_004",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Avenue, Austin, TX 73301",
      email: "carlos.ramirez@example.com",
      fullName: "Carlos Ramirez"
    },
    {
      user_id: "usr_005",
      phone: "+49 151 23456789",
      address: "Friedrichstraße 12, 10117 Berlin, Germany",
      email: "laura.schmidt@example.de",
      fullName: "Laura Schmidt"
    },
    {
      user_id: "usr_001",
      phone: "+1 (555) 123-4567",
      address: "123 Maple Street, Springfield, IL 62701",
      email: "emily.johnson@example.com",
      fullName: "Emily Johnson"
    },
    {
      user_id: "usr_002",
      phone: "+44 7700 900123",
      address: "42 Baker Street, London, W1U 7AJ, UK",
      email: "james.smith@example.co.uk",
      fullName: "James Smith"
    },
    {
      user_id: "usr_003",
      phone: "+61 412 345 678",
      address: "7/89 George Street, Sydney, NSW 2000, Australia",
      email: "mia.wong@example.com.au",
      fullName: "Mia Wong"
    },
    {
      user_id: "usr_004",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Avenue, Austin, TX 73301",
      email: "carlos.ramirez@example.com",
      fullName: "Carlos Ramirez"
    },
    {
      user_id: "usr_005",
      phone: "+49 151 23456789",
      address: "Friedrichstraße 12, 10117 Berlin, Germany",
      email: "laura.schmidt@example.de",
      fullName: "Laura Schmidt"
    },
    {
      user_id: "usr_001",
      phone: "+1 (555) 123-4567",
      address: "123 Maple Street, Springfield, IL 62701",
      email: "emily.johnson@example.com",
      fullName: "Emily Johnson"
    },
    {
      user_id: "usr_002",
      phone: "+44 7700 900123",
      address: "42 Baker Street, London, W1U 7AJ, UK",
      email: "james.smith@example.co.uk",
      fullName: "James Smith"
    },
    {
      user_id: "usr_003",
      phone: "+61 412 345 678",
      address: "7/89 George Street, Sydney, NSW 2000, Australia",
      email: "mia.wong@example.com.au",
      fullName: "Mia Wong"
    },
    {
      user_id: "usr_004",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Avenue, Austin, TX 73301",
      email: "carlos.ramirez@example.com",
      fullName: "Carlos Ramirez"
    },
    {
      user_id: "usr_005",
      phone: "+49 151 23456789",
      address: "Friedrichstraße 12, 10117 Berlin, Germany",
      email: "laura.schmidt@example.de",
      fullName: "Laura Schmidt"
    },
    {
      user_id: "usr_001",
      phone: "+1 (555) 123-4567",
      address: "123 Maple Street, Springfield, IL 62701",
      email: "emily.johnson@example.com",
      fullName: "Emily Johnson"
    },
    {
      user_id: "usr_002",
      phone: "+44 7700 900123",
      address: "42 Baker Street, London, W1U 7AJ, UK",
      email: "james.smith@example.co.uk",
      fullName: "James Smith"
    },
    {
      user_id: "usr_003",
      phone: "+61 412 345 678",
      address: "7/89 George Street, Sydney, NSW 2000, Australia",
      email: "mia.wong@example.com.au",
      fullName: "Mia Wong"
    },
    {
      user_id: "usr_004",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Avenue, Austin, TX 73301",
      email: "carlos.ramirez@example.com",
      fullName: "Carlos Ramirez"
    },
    {
      user_id: "usr_005",
      phone: "+49 151 23456789",
      address: "Friedrichstraße 12, 10117 Berlin, Germany",
      email: "laura.schmidt@example.de",
      fullName: "Laura Schmidt"
    },
    {
      user_id: "usr_001",
      phone: "+1 (555) 123-4567",
      address: "123 Maple Street, Springfield, IL 62701",
      email: "emily.johnson@example.com",
      fullName: "Emily Johnson"
    },
    {
      user_id: "usr_002",
      phone: "+44 7700 900123",
      address: "42 Baker Street, London, W1U 7AJ, UK",
      email: "james.smith@example.co.uk",
      fullName: "James Smith"
    },
    {
      user_id: "usr_003",
      phone: "+61 412 345 678",
      address: "7/89 George Street, Sydney, NSW 2000, Australia",
      email: "mia.wong@example.com.au",
      fullName: "Mia Wong"
    },
    {
      user_id: "usr_004",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Avenue, Austin, TX 73301",
      email: "carlos.ramirez@example.com",
      fullName: "Carlos Ramirez"
    },
    {
      user_id: "usr_005",
      phone: "+49 151 23456789",
      address: "Friedrichstraße 12, 10117 Berlin, Germany",
      email: "laura.schmidt@example.de",
      fullName: "Laura Schmidt"
    },
  ];