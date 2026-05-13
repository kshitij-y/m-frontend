import { z } from "zod";

export const rescheduleSessionSchema =
  z
    .object({
      date: z
        .string()
        .min(
          1,
          "Date is required"
        ),

      time: z
        .string()
        .min(
          1,
          "Time is required"
        )
        .regex(
          /^\d{2}:\d{2}$/,
          "Time must be HH:mm"
        ),

      duration: z
        .number({
          invalid_type_error:
            "Duration is required",
        })
        .int(
          "Duration must be a whole number"
        )
        .min(
          15,
          "Minimum duration is 15 minutes"
        )
        .max(
          480,
          "Maximum duration is 8 hours"
        )
        .refine(
          (v) => v % 15 === 0,
          "Duration must be in 15-minute increments"
        ),
    })

    .refine(
      (data) => {
        const startTime =
          new Date(
            `${data.date}T${data.time}`
          );

        return (
          startTime > new Date()
        );
      },

      {
        message:
          "Session must be scheduled in the future",

        path: ["date"],
      }
    );