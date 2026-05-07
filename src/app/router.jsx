import {
  createBrowserRouter,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";

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

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
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
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
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

          {
            element: <MentorRoute />,
            children: [
              {
                path: "/mentor/dashboard",
                element: <MentorDashboardPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);