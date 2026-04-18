import { Navigate } from "react-router-dom";

const AuthRedirect = () => {
  const token = localStorage.getItem("vehiclevault_token");
  const role = localStorage.getItem("vehiclevault_role")?.toString().trim().toUpperCase();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (["ADMIN", "OWNER", "SUBADMIN"].includes(role)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (["USER"].includes(role)) {
    return <Navigate to="/user/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default AuthRedirect;
