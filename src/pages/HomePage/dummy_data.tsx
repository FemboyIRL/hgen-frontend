import { Customer } from "../../types/customer";
import { Employee } from "../../types/employee";
import { MenuItem } from "../../types/menu_item";
import { Offer } from "../../types/offer";
import { Order } from "../../types/order";
import { Room } from "../../types/room";

export const dummyEmployees: Employee[] = [
  {
    user_id: "emp_001",
    hire_date: new Date("2022-03-15"),
    position: "Software Engineer",
    email: "carlos.rodriguez@empresa.com",
    fullName: "Carlos Rodríguez",
  },
  {
    user_id: "emp_002",
    hire_date: new Date("2021-07-22"),
    position: "Product Manager",
    email: "ana.martinez@empresa.com",
    fullName: "Ana Martínez",
  },
  {
    user_id: "emp_003",
    hire_date: new Date("2023-01-10"),
    position: "UX Designer",
    email: "lucia.gomez@empresa.com",
    fullName: "Lucía Gómez",
  },
  {
    user_id: "emp_004",
    hire_date: new Date("2020-11-05"),
    position: "Data Scientist",
    email: "javier.lopez@empresa.com",
    fullName: "Javier López",
  },
  {
    user_id: "emp_005",
    hire_date: new Date("2023-09-18"),
    position: "DevOps Engineer",
    email: "marta.fernandez@empresa.com",
    fullName: "Marta Fernández",
  },
];

export const dummyRooms: Room[] = [
  {
    room_number: "102",
    type: "Individual",
    description: "Habitación acogedora con cama individual, perfecta para viajeros solitarios",
    images: ["https://picsum.photos/800/500?random=2", "https://picsum.photos/800/500?random=1"],
    beds: 1,
    capacity: 1,
    amenities: ["WiFi", "TV", "Aire acondicionado", "Escritorio"],
    size: 18,
    bed_type: "Individual",
    floor: 1,
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
    size: 25,
    bed_type: "Individual",
    floor: 2,
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
    size: 45,
    bed_type: "King size",
    floor: 3,
    features: ["Terraza privada", "Sala de estar separada", "Servicio de habitaciones 24h"]
  },
  {
    room_number: "310",
    type: "Suite Familiar",
    description: "Amplia suite con cama king size y sofá cama, perfecta para familias",
    images: ["https://picsum.photos/800/500?random=6", "https://picsum.photos/800/500?random=7", "https://picsum.photos/800/500?random=8", "https://picsum.photos/800/500?random=9"],
    beds: 2,  // Una cama king + sofá cama
    capacity: 4,
    amenities: ["WiFi", "TV", "Aire acondicionado", "Minibar", "Caja fuerte", "Chimenea", "Jacuzzi"],
    size: 45,
    bed_type: "King size",
    floor: 3,
    features: ["Terraza privada", "Sala de estar separada", "Servicio de habitaciones 24h"]
  },
  {
    room_number: "310",
    type: "Suite Familiar",
    description: "Amplia suite con cama king size y sofá cama, perfecta para familias",
    images: ["https://picsum.photos/800/500?random=6", "https://picsum.photos/800/500?random=7", "https://picsum.photos/800/500?random=8", "https://picsum.photos/800/500?random=9"],
    beds: 2,  // Una cama king + sofá cama
    capacity: 4,
    amenities: ["WiFi", "TV", "Aire acondicionado", "Minibar", "Caja fuerte", "Chimenea", "Jacuzzi"],
    size: 45,
    bed_type: "King size",
    floor: 3,
    features: ["Terraza privada", "Sala de estar separada", "Servicio de habitaciones 24h"]
  },
  {
    room_number: "310",
    type: "Suite Familiar",
    description: "Amplia suite con cama king size y sofá cama, perfecta para familias",
    images: ["https://picsum.photos/800/500?random=6", "https://picsum.photos/800/500?random=7", "https://picsum.photos/800/500?random=8", "https://picsum.photos/800/500?random=9"],
    beds: 2,  // Una cama king + sofá cama
    capacity: 4,
    amenities: ["WiFi", "TV", "Aire acondicionado", "Minibar", "Caja fuerte", "Chimenea", "Jacuzzi"],
    size: 45,
    bed_type: "King size",
    floor: 3,
    features: ["Terraza privada", "Sala de estar separada", "Servicio de habitaciones 24h"]
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

export const dummyMenuItems: MenuItem[] = [
  {
    id: "menu_001",
    name: "Club Sandwich",
    description: "Triple layer sandwich with grilled chicken, bacon, lettuce, tomato, and mayonnaise",
    price: 12.99,
    is_available: true,
    images: [
      "https://picsum.photos/800/500?random=1",
      "https://picsum.photos/800/500?random=2",
    ]
  },
  {
    id: "menu_002",
    name: "Caesar Salad",
    description: "Fresh romaine lettuce, parmesan cheese, croutons, and creamy Caesar dressing",
    price: 10.50,
    is_available: true,
    images: [
      "https://picsum.photos/800/500?random=3",
    ]
  },
  {
    id: "menu_003",
    name: "Margherita Pizza",
    description: "Wood-fired pizza with fresh mozzarella, tomatoes, basil, and olive oil",
    price: 16.99,
    is_available: true,
    images: [
      "https://picsum.photos/800/500?random=4",
      "https://picsum.photos/800/500?random=5",
      "https://picsum.photos/800/500?random=6",
    ]
  },
  {
    id: "menu_004",
    name: "Grilled Salmon",
    description: "Atlantic salmon with lemon butter sauce, served with seasonal vegetables",
    price: 24.99,
    is_available: false,
    images: [
      "https://picsum.photos/800/500?random=7",
    ]
  },
  {
    id: "menu_005",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, served with vanilla ice cream",
    price: 8.50,
    is_available: true,
    images: [
      "https://picsum.photos/800/500?random=8",
      "https://picsum.photos/800/500?random=9",
    ]
  },
  {
    id: "menu_006",
    name: "Mojito",
    description: "Fresh mint, lime, rum, soda water, and sugar",
    price: 9.99,
    is_available: true,
    images: [
      "https://picsum.photos/800/500?random=10",
    ]
  },
  {
    id: "menu_007",
    name: "Pasta Carbonara",
    description: "Spaghetti with eggs, pecorino cheese, guanciale, and black pepper",
    price: 14.99,
    is_available: false,
    images: [
      "https://picsum.photos/800/500?random=11",
      "https://picsum.photos/800/500?random=12",
    ]
  },
  {
    id: "menu_008",
    name: "Breakfast Burrito",
    description: "Scrambled eggs, chorizo, beans, cheese, and salsa wrapped in a flour tortilla",
    price: 11.99,
    is_available: true,
    images: [
      "https://picsum.photos/800/500?random=13",
      "https://picsum.photos/800/500?random=14",
    ]
  },
  {
    id: "menu_009",
    name: "French Onion Soup",
    description: "Caramelized onions in rich beef broth, topped with toasted bread and melted Gruyère",
    price: 9.50,
    is_available: true,
    images: [
      "https://picsum.photos/800/500?random=15",
    ]
  },
  {
    id: "menu_010",
    name: "New York Cheesecake",
    description: "Creamy cheesecake with graham cracker crust and strawberry topping",
    price: 7.99,
    is_available: true,
    images: [
      "https://picsum.photos/800/500?random=16",
      "https://picsum.photos/800/500?random=17",
    ]
  }
];

export const dummyOrders: Order[] = [
  {
    order_id: "ORD-001",
    order_date: new Date("2026-03-15T12:30:00"),
    total_price: 45.97,
    user_id: "usr_001",
    user_name: "Emily Johnson",
    user_email: "emily.johnson@example.com",
    menu_items: [
      {
        id: "menu_001",
        name: "Club Sandwich",
        description: "Triple layer sandwich with grilled chicken, bacon, lettuce, tomato, and mayonnaise",
        price: 12.99,
        is_available: true,
        images: ["https://picsum.photos/800/500?random=1"]
      },
      {
        id: "menu_003",
        name: "Margherita Pizza",
        description: "Wood-fired pizza with fresh mozzarella, tomatoes, basil, and olive oil",
        price: 16.99,
        is_available: true,
        images: ["https://picsum.photos/800/500?random=4"]
      },
      {
        id: "menu_006",
        name: "Mojito",
        description: "Fresh mint, lime, rum, soda water, and sugar",
        price: 9.99,
        is_available: true,
        images: ["https://picsum.photos/800/500?random=10"]
      }
    ]
  },
  {
    order_id: "ORD-002",
    order_date: new Date("2026-03-15T19:45:00"),
    total_price: 32.49,
    user_id: "usr_002",
    user_name: "James Smith",
    user_email: "james.smith@example.co.uk",
    menu_items: [
      {
        id: "menu_002",
        name: "Caesar Salad",
        description: "Fresh romaine lettuce, parmesan cheese, croutons, and creamy Caesar dressing",
        price: 10.50,
        is_available: true,
        images: ["https://picsum.photos/800/500?random=3"]
      },
      {
        id: "menu_005",
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center, served with vanilla ice cream",
        price: 8.50,
        is_available: true,
        images: ["https://picsum.photos/800/500?random=8"]
      },
      {
        id: "menu_008",
        name: "Breakfast Burrito",
        description: "Scrambled eggs, chorizo, beans, cheese, and salsa wrapped in a flour tortilla",
        price: 11.99,
        is_available: true,
        images: ["https://picsum.photos/800/500?random=13"]
      }
    ]
  },
  {
    order_id: "ORD-003",
    order_date: new Date("2026-03-16T13:15:00"),
    total_price: 24.99,
    user_id: "usr_003",
    user_name: "Mia Wong",
    user_email: "mia.wong@example.com.au",
    menu_items: [
      {
        id: "menu_004",
        name: "Grilled Salmon",
        description: "Atlantic salmon with lemon butter sauce, served with seasonal vegetables",
        price: 24.99,
        is_available: false,
        images: ["https://picsum.photos/800/500?random=7"]
      }
    ]
  },
  {
    order_id: "ORD-004",
    order_date: new Date("2026-03-16T20:00:00"),
    total_price: 58.97,
    user_id: "usr_004",
    user_name: "Carlos Ramirez",
    user_email: "carlos.ramirez@example.com",
    menu_items: [
      {
        id: "menu_007",
        name: "Pasta Carbonara",
        description: "Spaghetti with eggs, pecorino cheese, guanciale, and black pepper",
        price: 14.99,
        is_available: false,
        images: ["https://picsum.photos/800/500?random=11"]
      },
      {
        id: "menu_009",
        name: "French Onion Soup",
        description: "Caramelized onions in rich beef broth, topped with toasted bread and melted Gruyère",
        price: 9.50,
        is_available: true,
        images: ["https://picsum.photos/800/500?random=15"]
      },
      {
        id: "menu_010",
        name: "New York Cheesecake",
        description: "Creamy cheesecake with graham cracker crust and strawberry topping",
        price: 7.99,
        is_available: true,
        images: ["https://picsum.photos/800/500?random=16"]
      },
      {
        id: "menu_006",
        name: "Mojito",
        description: "Fresh mint, lime, rum, soda water, and sugar",
        price: 9.99,
        is_available: true,
        images: ["https://picsum.photos/800/500?random=10"]
      },
      {
        id: "menu_001",
        name: "Club Sandwich",
        description: "Triple layer sandwich with grilled chicken, bacon, lettuce, tomato, and mayonnaise",
        price: 12.99,
        is_available: true,
        images: ["https://picsum.photos/800/500?random=1"]
      }
    ]
  },
  {
    order_id: "ORD-005",
    order_date: new Date("2026-03-17T11:30:00"),
    total_price: 18.49,
    user_id: "usr_005",
    user_name: "Laura Schmidt",
    user_email: "laura.schmidt@example.de",
    menu_items: [
      {
        id: "menu_008",
        name: "Breakfast Burrito",
        description: "Scrambled eggs, chorizo, beans, cheese, and salsa wrapped in a flour tortilla",
        price: 11.99,
        is_available: true,
        images: ["https://picsum.photos/800/500?random=13"]
      },
      {
        id: "menu_005",
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center, served with vanilla ice cream",
        price: 8.50,
        is_available: true,
        images: ["https://picsum.photos/800/500?random=8"]
      }
    ]
  },
  {
    order_id: "ORD-006",
    order_date: new Date("2026-03-17T18:30:00"),
    total_price: 41.97,
    user_id: "usr_001",
    user_name: "Emily Johnson",
    user_email: "emily.johnson@example.com",
    menu_items: [
      {
        id: "menu_003",
        name: "Margherita Pizza",
        description: "Wood-fired pizza with fresh mozzarella, tomatoes, basil, and olive oil",
        price: 16.99,
        is_available: true,
        images: ["https://picsum.photos/800/500?random=4"]
      },
      {
        id: "menu_009",
        name: "French Onion Soup",
        description: "Caramelized onions in rich beef broth, topped with toasted bread and melted Gruyère",
        price: 9.50,
        is_available: true,
        images: ["https://picsum.photos/800/500?random=15"]
      },
      {
        id: "menu_010",
        name: "New York Cheesecake",
        description: "Creamy cheesecake with graham cracker crust and strawberry topping",
        price: 7.99,
        is_available: true,
        images: ["https://picsum.photos/800/500?random=16"]
      },
      {
        id: "menu_006",
        name: "Mojito",
        description: "Fresh mint, lime, rum, soda water, and sugar",
        price: 9.99,
        is_available: true,
        images: ["https://picsum.photos/800/500?random=10"]
      }
    ]
  }
];
