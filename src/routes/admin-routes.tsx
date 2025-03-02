export const AdminRoutes = () => {
    return [
        {
            path: "home",
            element: <></>,
            title: "Inicio",
            icon: (
                <img
                    src="/assets/svg/iconInicioBlack.svg"
                    alt="..."
                />
            ),
        },
        {
            path: "clients",
            element: <></>,
            title: "Clientes",
            icon: (
                <img
                    src="/assets/svg/clientes.svg"
                    alt="Clientes"
                />
            ),
        },
        {
            path: "rooms",
            element: <></>,
            title: "Habitaciones",
            icon: (
                <img
                    src="/assets/svg/door.svg"
                    alt="Habitaciones"
                />
            ),
        },
        {
            path: "reservations",
            element: <></>,
            title: "Reservaciones",
            icon: (
                <img
                    src="/assets/svg/hotel.svg"
                    alt="Reservaciones"
                />
            ),
        },
        {
            path: "menu",
            element: <></>,
            title: "Menú",
            icon: (
                <img
                    src="/assets/svg/menu.svg"
                    alt="Menú"
                />
            ),
        },
        {
            path: "orders",
            element: <></>,
            title: "Órdenes",
            icon: (
                <img
                    src="/assets/svg/orders.svg"
                    alt="Órdenes"
                />
            ),
        },
        {
            path: "employees",
            element: <></>,
            title: "Empleados",
            icon: (
                <img
                    src="/assets/svg/empleados.svg"
                    alt="Empleados"
                />
            ),
        },
        {
            path: "*",
            element: <p>Página no encontrada</p>,
            title: "",
            icon: "",
        },
    ];
};