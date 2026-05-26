import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import AuthRedirect from "../components/AuthRedirect";
import { AdminLayout } from "../components/admin/AdminLayout";
import { AdminUsers } from "../components/admin/AdminUsers";
import { AdminCars } from "../components/admin/AdminCars";
import { AdminDashboard } from "../components/admin/AdminDashboard";
import { AdminNotifications } from "../components/admin/AdminNotifications";
import { AdminActiveUsers } from "../components/admin/AdminActiveUsers";
import { UserHome } from "../components/user/UserHome";
import { CarCatalog } from "../components/user/CarCatalog";
import { CarDetails } from "../components/user/CarDetails";
import { UserDashboard } from "../components/user/UserDashboard";
import { UserLayout } from "../components/user/UserLayout";
import { CompareCars } from "../components/user/CompareCars";
import ProtectedRoutes from "../components/ProtectedRoutes";

const router = createBrowserRouter([
  { path: "/", element: <AuthRedirect /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
  {
    path: "/user",
    element: (
      <ProtectedRoutes userRoles={["USER"]}>
        <UserLayout />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <UserHome /> },
      { path: "dashboard", element: <UserDashboard /> },
      { path: "cars", element: <CarCatalog /> },
      { path: "cars/:id", element: <CarDetails /> },
      { path: "compare", element: <CompareCars /> }
    ]
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoutes userRoles={["ADMIN", "OWNER", "SUBADMIN"]}>
        <AdminLayout />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "users", element: <AdminUsers /> },
      { path: "active-users", element: <AdminActiveUsers /> },
      { path: "cars", element: <AdminCars /> },
      { path: "notifications", element: <AdminNotifications /> }
    ]
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
