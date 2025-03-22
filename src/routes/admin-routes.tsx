import { House, People, DoorOpen, CalendarCheck, List, ClipboardCheck, Briefcase } from "react-bootstrap-icons"
import CustomersPage from "../adminPages/Customers/customers"
import RoomsPage from "../adminPages/Rooms/rooms"

export const AdminRoutes = () => {
    return [
        {
            path: "home",
            element: <>nigger</>,
            title: "Inicio",
            icon: <House size={30} />,
        },
        {
            path: "clients",
            element: <CustomersPage />,
            title: "Clientes",
            icon: <People size={30} />,
        },
        {
            path: "rooms",
            element: <RoomsPage />,
            title: "Habitaciones",
            icon: <DoorOpen size={30} />,
        },
        {
            path: "reservations",
            element: <></>,
            title: "Reservaciones",
            icon: <CalendarCheck size={30} />,
        },
        {
            path: "menu",
            element: <></>,
            title: "Menú",
            icon: <List size={30} />,
        },
        {
            path: "orders",
            element: <></>,
            title: "Órdenes",
            icon: <ClipboardCheck size={30} />,
        },
        {
            path: "employees",
            element: <></>,
            title: "Empleados",
            icon: <Briefcase size={30} />,
        },
        {
            path: "*",
            element: <p>Página no encontrada</p>,
            title: "",
            icon: "",
        },
    ]
}
