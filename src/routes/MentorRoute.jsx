import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MentorRoute() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const isOnboardingPath =
    location.pathname === "/mentor/onboarding";

  if (user?.role !== "MENTOR") {
    return <Navigate to="/mentee/dashboard" replace />;
  }

  if (!user?.onboardingCompleted && !isOnboardingPath) {
    return <Navigate to="/mentor/onboarding" replace />;
  }

  return <Outlet />;
}