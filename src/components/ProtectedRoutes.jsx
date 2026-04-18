import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, userRoles }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("vehiclevault_token");
    const storedRole = localStorage.getItem("vehiclevault_role");

    setToken(storedToken);
    setRole(storedRole ? storedRole.toString().trim().toUpperCase() : null);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (userRoles && !userRoles.includes(role)) {
    if (role === "ADMIN" || role === "OWNER" || role === "SUBADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (role === "USER") {
      return <Navigate to="/user/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
