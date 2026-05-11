import {
  LayoutDashboard,
  Users,
  User,
  Brain,
  BookOpen,
  MessageSquare,
  CalendarDays,
} from "lucide-react";

export const menteeNavItems = [
  {
    title: "Dashboard",
    path: "/mentee/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Mentors",
    path: "/mentee/mentors",
    icon: Users,
  },

  {
    title: "Mentorships",
    path: "/mentee/mentorships",
    icon: BookOpen,
  },

  {
    title: "Chat",
    path: "/mentee/chat",
    icon: MessageSquare,
  },

  {
    title: "AI Match",
    path: "/mentee/ai-match",
    icon: Brain,
  },

  {
    title: "Profile",
    path: "/mentee/profile",
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
    title: "Sessions",
    path: "/mentor/sessions",
    icon: CalendarDays,
  },

  {
    title: "Chat",
    path: "/mentor/chat",
    icon: MessageSquare,
  },

  {
    title: "Profile",
    path: "/mentor/profile",
    icon: User,
  },
];