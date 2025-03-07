import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { outSidePages } from './routes/public-routes';
import PrivateRoute from './components/PrivateRoute/private-route';
import { AdminRoutes } from './routes/admin-routes';
import { UserProvider } from './context/UserContext/user-context';
import { ToastContainer } from 'react-bootstrap';

function App() {

  const router = createBrowserRouter([
    ...outSidePages,
    {
      path: "/admin/*",
      element: <PrivateRoute element={
        <></>
      } />,
      children: AdminRoutes(),
    },
  ]);
  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}

export default App
