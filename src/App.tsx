import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { outSidePages } from './routes/public-routes';
import PrivateRoute from './components/PrivateRoute/private-route';
import { AdminRoutes } from './routes/admin-routes';
import { UserProvider } from './context/UserContext/user-context';
import AdminLayout from './components/adminLayout/admin-layout';

function App() {

  const router = createBrowserRouter([
    ...outSidePages,
    {
      path: "/admin/*",
      element: <PrivateRoute element={
        <AdminLayout />
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
