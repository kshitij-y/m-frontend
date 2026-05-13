import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarDays,
  Clock3,
  Sparkles,
  Users,
} from "lucide-react";

import { sessionFormSchema } from "../schemas/sessionFormSchema";
import { useCreateSession } from "../hooks/useCreateSession";

export default function ScheduleSessionModal({
  isOpen,
  onClose,
  mentorships = [],
}) {
  const { mutate, isPending } =
    useCreateSession();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      sessionFormSchema
    ),

    defaultValues: {
      mentorshipId: "",
      date: "",
      time: "",
      duration: 60,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        mentorshipId: "",
        date: "",
        time: "",
        duration: 60,
      });
    }
  }, [isOpen, reset]);

  if (!isOpen) {
    return null;
  }

  const selectedMentee =
    mentorships.find(
      (item) =>
        item.mentorshipId ===
        watch("mentorshipId")
    );

  const onSubmit = (data) => {
    const startTime = new Date(
      `${data.date}T${data.time}`
    );

    const endTime = new Date(
      startTime.getTime() +
        data.duration * 60000
    );

    mutate(
      {
        mentorshipId:
          data.mentorshipId,

        startTime:
          startTime.toISOString(),

        endTime:
          endTime.toISOString(),
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">
        {/* HEADER */}
        <div className="border-b border-slate-100 bg-gradient-to-br from-indigo-50 via-white to-slate-50 p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-100/60 px-3 py-1 text-xs font-semibold text-indigo-700">
                <Sparkles className="h-3.5 w-3.5" />
                New Session
              </div>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                Schedule mentorship
                session
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                Create and organize
                mentorship meetings
                with your active
                mentees.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
            >
              Close
            </button>
          </div>

          {/* SELECTED MENTEE */}
          {selectedMentee && (
            <div className="mt-8 flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-lg font-bold text-indigo-700">
                {selectedMentee.avatar ? (
                  <img
                    src={
                      selectedMentee.avatar
                    }
                    alt={
                      selectedMentee.name
                    }
                    className="h-full w-full rounded-2xl object-cover"
                  />
                ) : (
                  selectedMentee.name?.charAt(
                    0
                  ) || "M"
                )}
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {selectedMentee.name}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Active mentee
                </p>
              </div>
            </div>
          )}
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-6 p-8"
        >
          {/* MENTEE SELECT */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Users className="h-4 w-4 text-indigo-500" />
              Select Mentee
            </label>

            <select
              {...register(
                "mentorshipId"
              )}
              className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white"
            >
              <option value="">
                Choose a mentee
              </option>

              {mentorships.map(
                (mentee) => (
                  <option
                    key={
                      mentee.menteeId
                    }
                    value={
                      mentee.mentorshipId
                    }
                  >
                    {mentee.name}
                  </option>
                )
              )}
            </select>

            {errors.mentorshipId && (
              <p className="mt-2 text-xs font-medium text-red-600">
                Please select a
                mentee
              </p>
            )}
          </div>

          {/* DATE + TIME */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CalendarDays className="h-4 w-4 text-indigo-500" />
                Session Date
              </label>

              <input
                type="date"
                {...register("date")}
                className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white"
              />

              {errors.date && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {
                    errors.date
                      .message
                  }
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Clock3 className="h-4 w-4 text-indigo-500" />
                Session Time
              </label>

              <input
                type="time"
                {...register("time")}
                className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white"
              />

              {errors.time && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {
                    errors.time
                      .message
                  }
                </p>
              )}
            </div>
          </div>

          {/* DURATION */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Session Duration
            </label>

            <div className="relative mt-3">
              <input
                type="number"
                min={15}
                step={15}
                {...register(
                  "duration",
                  {
                    valueAsNumber: true,
                  }
                )}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pr-24 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                minutes
              </span>
            </div>

            {errors.duration && (
              <p className="mt-2 text-xs font-medium text-red-600">
                {
                  errors.duration
                    .message
                }
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending
                ? "Scheduling..."
                : "Schedule Session"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}