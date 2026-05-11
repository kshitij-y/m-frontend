export default function BookingModal({
  mentor,
  plan,
  isOpen,
  isPending,
  onClose,
  onConfirm,
}) {
  if (!isOpen || !plan) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              Confirm booking
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Review the mentorship details before confirming.
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

        <div className="mt-5 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Mentor
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {mentor?.name}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Plan
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {plan.title || "Mentorship Plan"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Duration
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {plan.duration}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Price
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                ${plan.price}
              </p>
            </div>
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
            disabled={isPending}
            onClick={onConfirm}
            className="rounded-2xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
