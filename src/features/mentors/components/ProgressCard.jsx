
export default function ProgressCard({
  label,
  completed,
  optional = false,
}) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 transition ${
        completed
          ? "border-emerald-200 bg-emerald-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-slate-700">
          {label}
        </p>

        {optional && (
          <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Optional
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${
            completed
              ? "bg-emerald-500"
              : "bg-slate-300"
          }`}
        />

        <p
          className={`text-xs font-medium ${
            completed
              ? "text-emerald-600"
              : "text-slate-500"
          }`}
        >
          {completed ? "Completed" : "Pending"}
        </p>
      </div>
    </div>
  );
}