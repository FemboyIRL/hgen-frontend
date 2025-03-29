import HomePage from "../pages/HomePage/homepage";
import LoginPage from "../pages/LoginPage/login-page";

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
];