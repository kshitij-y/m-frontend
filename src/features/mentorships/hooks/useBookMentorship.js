import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { useCreateMentorship } from "./useCreateMentorship";

export function useBookMentorship() {
  const navigate = useNavigate();

  const {
    mutateAsync: createMentorship,
    isPending,
  } = useCreateMentorship();

  const bookMentorship = async ({
    mentorId,
    planId,
  }) => {
    try {
      await createMentorship({
        mentorId,
        planId,
      });

      toast.success(
        "Mentorship booked successfully"
      );

      navigate("/mentorships");
    } catch (error) {
      toast.error(
        getErrorMessage(error) ||
          "Failed to create mentorship"
      );
    }
  };

  return {
    bookMentorship,
    isPending,
  };
}