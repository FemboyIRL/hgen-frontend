import { House, People, DoorOpen, CalendarCheck, List, ClipboardCheck, Briefcase, TagFill } from "react-bootstrap-icons"
import CustomersPage from "../adminPages/Customers/customers"
import RoomsPage from "../adminPages/Rooms/rooms"
import MenuItemsPage from "../adminPages/Menu/menu"
import OffersPage from "../adminPages/Offers/offers"
import OrderPage from "../adminPages/Orders/orders"

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
            element: <MenuItemsPage />,
            title: "Menú",
            icon: <List size={30} />,
        },
        {
            path: "orders",
            element: <OrderPage />,
            title: "Órdenes",
            icon: <ClipboardCheck size={30} />,
        },
        {
            path: "offers",
            element: <OffersPage />,
            title: "Ofertas",
            icon: <TagFill />
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
