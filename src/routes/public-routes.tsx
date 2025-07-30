import HomePage from "../pages/HomePage/homepage";
import LoginPage from "../pages/LoginPage/login-page";
import RegisterPage from "../pages/RegisterPage/register-page";
import ReservePage from "../pages/Reservations/reservations";

export const outSidePages = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/Reservations",
    element: <ReservePage />
  },
  {
    path: "/Register",
    element: <RegisterPage />
  }
];