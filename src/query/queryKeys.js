export const queryKeys = {
  auth: {
    me: ["auth", "me"],
  },

  mentors: {
    all: ["mentors"],
    detail: (id) => ["mentor", id],
    plans: (id) => ["mentor-plans", id],
  },

  mentorships: {
    all: ["mentorships"],
    my: ["my-mentorships"],
    detail: (id) => ["mentorship", id],
  },
};