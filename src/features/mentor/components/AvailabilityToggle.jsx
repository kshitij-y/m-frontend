import { useEffect, useState } from "react";

import { useUpdateMentorProfile } from "../../mentors/hooks/useUpdateMentorProfile";

export default function AvailabilityToggle({
  value,
  disabled = false,
  onUpdated,
}) {
  const [localValue, setLocalValue] = useState(Boolean(value));
  const { mutateAsync, isPending } = useUpdateMentorProfile();

  useEffect(() => {
    setLocalValue(Boolean(value));
  }, [value]);

  const handleToggle = async () => {
    const nextValue = !localValue;
    setLocalValue(nextValue);

    await mutateAsync({ isAvailable: nextValue });

    if (onUpdated) {
      onUpdated();
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-900">
          {localValue
            ? "Accepting new mentees"
            : "Not accepting new mentees"}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          This only affects new mentorship bookings.
        </p>
      </div>
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled || isPending}
        className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
          localValue
            ? "bg-emerald-100 text-emerald-700"
            : "bg-slate-100 text-slate-600"
        } disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {isPending ? "Updating..." : localValue ? "Available" : "Unavailable"}
      </button>
    </div>
  );
}
