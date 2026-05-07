import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MenteeRoute() {
  const { user } = useSelector((state) => state.auth);

  if (user?.role !== "MENTEE") {
    return <Navigate to="/mentor/dashboard" replace />;
  }

  return <Outlet />;
}