import { useEffect, useState } from "react";

const buildDateValue = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const buildTimeValue = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");

  return `${hours}:${minutes}`;
};

export default function ScheduleSessionModal({
  title,
  isOpen,
  mentorship,
  isPending,
  onClose,
  onConfirm,
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isOpen) {
      setDate(buildDateValue(mentorship?.startDate));
      setTime(buildTimeValue(mentorship?.startDate));
      setDuration("60");
      setNotes("");
    }
  }, [isOpen, mentorship]);

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    if (!date || !time) {
      return;
    }

    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = time.split(":").map(Number);

    const start = new Date(year, month - 1, day, hour, minute);

    onConfirm({
      startDate: start.toISOString(),
      durationMinutes: Number(duration),
      notes,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              {title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Confirm the session timing and details.
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

        <div className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="mt-2 h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm text-slate-700"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="mt-2 h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm text-slate-700"
              />
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
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              className="mt-2 h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm text-slate-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Session notes (optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
              placeholder="Share agenda or preparation notes for the mentee."
            />
          </div>
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
            type="button"
            disabled={isPending || !date || !time}
            onClick={handleConfirm}
            className="rounded-2xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Scheduling..." : "Confirm schedule"}
          </button>
        </div>
      </div>
    </div>
  );
}
