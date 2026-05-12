export const queryKeys = {
  auth: {
    me: ["auth", "me"],
  },

  onboarding: {
    status: ["onboarding", "status"],
  },

  mentors: {
    all: ["mentors"],
    detail: (id) => ["mentor", id],
    plans: (id) => ["mentor-plans", id],
    myPlans: ["mentor", "plans", "me"],
    expertise: ["mentor", "expertise", "me"],
  },

  mentorships: {
    all: ["mentorships"],
    my: ["my-mentorships"],
    detail: (id) => ["mentorship", id],
  },
  calendar: {
    status: ["calendar", "status"],
  },

  chat: {
    token: ["chat", "token"],
  },
};