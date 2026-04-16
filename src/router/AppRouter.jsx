import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { AdminDashboard } from "../components/admin/AdminDashboard";
import { AdminLayout } from "../components/admin/AdminLayout";
import { AdminUsers } from "../components/admin/AdminUsers";
import { AdminCars } from "../components/admin/AdminCars";
import { CarCatalog } from "../components/user/CarCatalog";
import { CarDetails } from "../components/user/CarDetails";
import { GetApiDemo } from "../components/user/GetApiDemo";
import { UseEffectDemo } from "../components/user/UseEffectDemo";
import { UserDashboard } from "../components/user/UserDashboard";
import { UserHome } from "../components/user/UserHome";
import { UserLayout } from "../components/user/UserLayout";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <UserHome /> },
      { path: "dashboard", element: <UserDashboard /> },
      { path: "cars", element: <CarCatalog /> },
      { path: "cars/:id", element: <CarDetails /> },
      { path: "getapidemo", element: <GetApiDemo /> },
      { path: "useeffectdemo", element: <UseEffectDemo /> }
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "users", element: <AdminUsers /> },
      { path: "cars", element: <AdminCars /> }
    ]
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
