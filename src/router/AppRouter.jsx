import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { AdminDashboard } from "../components/admin/AdminDashboard";
import { AdminLayout } from "../components/admin/AdminLayout";
import { AdminUsers } from "../components/admin/AdminUsers";
import { CarCatalog } from "../components/user/CarCatalog";
import { CarDetailsPage } from "../components/user/CarDetailsPage";
import { GetApiDemo } from "../components/user/GetApiDemo";
import { UseEffectDemo } from "../components/user/UseEffectDemo";
import { UserDashboard } from "../components/user/UserDashboard";
import { UserLayout } from "../components/user/UserLayout";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <UserDashboard /> },
      { path: "dashboard", element: <UserDashboard /> },
      { path: "cars", element: <CarCatalog /> },
      { path: "cars/:id", element: <CarDetailsPage /> },
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
      { path: "users", element: <AdminUsers /> }
    ]
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
