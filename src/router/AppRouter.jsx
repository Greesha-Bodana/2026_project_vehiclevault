import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { AdminLayout } from "../components/admin/AdminLayout";
import { AdminUsers } from "../components/admin/AdminUsers";
import { GetApiDemo } from "../components/user/GetApiDemo";
import { UserHome } from "../components/user/UserHome";
import { UseEffectDemo } from "../components/user/UseEffectDemo";
import { VehicleVaultCarCatalog } from "../components/user/VehicleVaultCarCatalog";
import { VehicleVaultCarDetails } from "../components/user/VehicleVaultCarDetails";
import { UserDashboard } from "../components/user/UserDashboard";
import { UserLayout } from "../components/user/UserLayout";
import { VehicleVaultAdminCars } from "../components/admin/VehicleVaultAdminCars";
import { VehicleVaultAdminDashboard } from "../components/admin/VehicleVaultAdminDashboard";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <UserHome /> },
      { path: "dashboard", element: <UserDashboard /> },
      { path: "cars", element: <VehicleVaultCarCatalog /> },
      { path: "cars/:id", element: <VehicleVaultCarDetails /> },
      { path: "getapidemo", element: <GetApiDemo /> },
      { path: "useeffectdemo", element: <UseEffectDemo /> }
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <VehicleVaultAdminDashboard /> },
      { path: "dashboard", element: <VehicleVaultAdminDashboard /> },
      { path: "users", element: <AdminUsers /> },
      { path: "cars", element: <VehicleVaultAdminCars /> }
    ]
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
