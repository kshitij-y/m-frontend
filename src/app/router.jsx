import {
  createBrowserRouter,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import LandingPage from "../pages/LandingPage";

import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import OtpPage from "../pages/auth/OtpPage";
import ForgetPasswordPage from "../pages/auth/ForgetPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";

import MenteeDashboardPage from "../pages/mentee/DashboardPage";
import MentorDashboardPage from "../pages/mentor/DashboardPage";

import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";
import MentorRoute from "../routes/MentorRoute";
import MenteeRoute from "../routes/MenteeRoute";

import MentorsPage from "../pages/mentee/MentorsPage";
import MentorProfilePage from "../pages/mentee/MentorProfilePage";
import MentorshipsPage from "../pages/mentee/MentorshipsPage";
import ProfilePage from "../pages/mentee/ProfilePage";

import PlansPage from "../pages/mentor/PlansPage";
import MentorProfile from "../pages/mentor/ProfilePage";
import BookingsPage from "../pages/mentor/BookingsPage";
import MentorOnboardingPage from "../pages/mentor/OnboardingPage";

import RouteErrorBoundary from "../routes/RouteErrorBoundary";

export const router = createBrowserRouter([
  {
    errorElement: <RouteErrorBoundary />,

    element: <PublicRoute />,

    children: [
      {
        path: "/",
        element: <LandingPage />,
      },

      {
        element: <AuthLayout />,

        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },

          {
            path: "/signup",
            element: <SignupPage />,
          },

          {
            path: "/verify-otp",
            element: <OtpPage />,
          },

          {
            path: "/forgot-password",
            element: <ForgetPasswordPage />,
          },

          {
            path: "/reset-password",
            element: <ResetPasswordPage />,
          },
        ],
      },
    ],
  },

  // ONBOARDING (NO DASHBOARD LAYOUT)
  {
    element: <ProtectedRoute />,

    children: [
      {
        element: <MentorRoute />,

        children: [
          {
            path: "/mentor/onboarding",
            element: <MentorOnboardingPage />,
          },
        ],
      },
    ],
  },

  // DASHBOARD ROUTES
  {
    element: <ProtectedRoute />,

    children: [
      {
        element: <DashboardLayout />,

        children: [
          // MENTEE ROUTES
          {
            element: <MenteeRoute />,

            children: [
              {
                path: "/dashboard",
                element: <MenteeDashboardPage />,
              },

              {
                path: "/mentors",
                element: <MentorsPage />,
              },

              {
                path: "/mentors/:id",
                element: <MentorProfilePage />,
              },

              {
                path: "/mentorships",
                element: <MentorshipsPage />,
              },

              {
                path: "/profile",
                element: <ProfilePage />,
              },
            ],
          },

          // MENTOR ROUTES
          {
            element: <MentorRoute />,

            children: [
              {
                path: "/mentor/dashboard",
                element: <MentorDashboardPage />,
              },

              {
                path: "/mentor/profile",
                element: <MentorProfile />,
              },

              {
                path: "/mentor/plans",
                element: <PlansPage />,
              },

              {
                path: "/mentor/bookings",
                element: <BookingsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);