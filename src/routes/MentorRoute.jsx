import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MentorRoute() {
  const { user } = useSelector((state) => state.auth);

  if (user?.role !== "MENTOR") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}