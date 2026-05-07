import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute() {
  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  if (isAuthenticated) {
    if (user?.role === "MENTOR") {
      return <Navigate to="/mentor/dashboard" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}