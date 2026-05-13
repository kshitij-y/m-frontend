import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { rescheduleSessionSchema } from "../schemas/rescheduleSessionSchema";
import { useRescheduleSession } from "../hooks/useRescheduleSession";

function extractDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function extractTime(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes}`;
}

function computeDuration(startTime, endTime) {
  if (!startTime || !endTime) return 60;
  const start = new Date(startTime);
  const end = new Date(endTime);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 60;
  const diffMinutes = Math.round((end - start) / 60000);
  return diffMinutes > 0 ? diffMinutes : 60;
}

export default function RescheduleSessionModal({ isOpen, onClose, session }) {
  const { mutate, isPending } = useRescheduleSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      rescheduleSessionSchema
    ),
    defaultValues: {
      date: "",
      time: "",
      duration: 60,
    },
  });

  useEffect(() => {
    if (isOpen && session) {
      reset({
        date: extractDate(session.startTime),
        time: extractTime(session.startTime),
        duration: computeDuration(session.startTime, session.endTime),
      });
    }
  }, [isOpen, session, reset]);

  if (!isOpen) {
    return null;
  }

  const onSubmit = (data) => {
    const startTime = new Date(`${data.date}T${data.time}`);
    const endTime = new Date(startTime.getTime() + data.duration * 60000);

    mutate(
      {
        sessionId: session.id,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        mentorshipId: session.mentorshipId,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              Reschedule Session
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Update the date, time, or duration for this session.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-slate-400 hover:text-slate-600"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Date
              </label>
              <input
                type="date"
                {...register("date")}
                className="mt-2 h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm text-slate-700"
              />
              {errors.date && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Time
              </label>
              <input
                type="time"
                {...register("time")}
                className="mt-2 h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm text-slate-700"
              />
              {errors.time && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.time.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Duration (minutes)
            </label>
            <input
              type="number"
              min={15}
              step={15}
              {...register("duration", { valueAsNumber: true })}
              className="mt-2 h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm text-slate-700"
            />
            {errors.duration && (
              <p className="mt-1 text-xs text-red-600">
                {errors.duration.message}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-2xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Rescheduling..." : "Confirm reschedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
