import {
  LayoutDashboard,
  Users,
  User,
  Brain,
  BookOpen,
  ClipboardList,
} from "lucide-react";

export const menteeNavItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Mentors",
    path: "/mentors",
    icon: Users,
  },

  {
    title: "Mentorships",
    path: "/mentorships",
    icon: BookOpen,
  },

  {
    title: "AI Assistant",
    path: "/ai",
    icon: Brain,
  },

  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
];

export const mentorNavItems = [
  {
    title: "Dashboard",
    path: "/mentor/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Plans",
    path: "/mentor/plans",
    icon: ClipboardList,
  },

  {
    title: "Bookings",
    path: "/mentor/bookings",
    icon: BookOpen,
  },

  {
    title: "Profile",
    path: "/mentor/profile",
    icon: User,
  },
];