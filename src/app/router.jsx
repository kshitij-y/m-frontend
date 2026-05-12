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

import MenteeDashboardPage from "../features/mentee/pages/DashboardPage";
import MentorDetailsPage from "../features/mentee/pages/MentorDetailsPage";
import MentorDashboardPage from "../features/mentor/pages/DashboardPage";

import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";
import MentorRoute from "../routes/MentorRoute";
import MenteeRoute from "../routes/MenteeRoute";

import MentorsPage from "../features/mentee/pages/MentorsPage";
import MentorshipsPage from "../features/mentee/pages/MentorshipsPage";
import MenteeChatPage from "../features/mentee/pages/ChatPage";
import MenteeAiMatchPage from "../features/mentee/pages/AiMatchPage";
import MenteeProfilePage from "../features/mentee/pages/ProfilePage";
import MenteeProfileEditPage from "../features/mentee/pages/ProfileEditPage";

import MentorSessionsPage from "../features/mentor/pages/SessionsPage";
import MentorChatPage from "../features/mentor/pages/ChatPage";
import MentorProfile from "../features/mentor/pages/ProfilePage";
import MentorProfileEditPage from "../features/mentor/pages/ProfileEditPage";
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
                path: "/mentee/dashboard",
                element: <MenteeDashboardPage />,
              },

              {
                path: "/mentee/mentors",
                element: <MentorsPage />,
              },

              {
                path: "/mentee/mentors/:mentorId",
                element: <MentorDetailsPage />,
              },

              {
                path: "/mentee/mentorships",
                element: <MentorshipsPage />,
              },

              {
                path: "/mentee/chat",
                element: <MenteeChatPage />,
              },

              {
                path: "/mentee/ai-match",
                element: <MenteeAiMatchPage />,
              },

              {
                path: "/mentee/profile",
                element: <MenteeProfilePage />,
              },

              {
                path: "/mentee/profile/edit",
                element: <MenteeProfileEditPage />,
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
                path: "/mentor/sessions",
                element: <MentorSessionsPage />,
              },

              {
                path: "/mentor/chat",
                element: <MentorChatPage />,
              },

              {
                path: "/mentor/profile",
                element: <MentorProfile />,
              },

              {
                path: "/mentor/profile/edit",
                element: <MentorProfileEditPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);