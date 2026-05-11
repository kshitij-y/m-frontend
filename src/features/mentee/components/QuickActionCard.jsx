export default function QuickActionCard({ action }) {
  return (
    <button className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-200 hover:text-indigo-600">
      <div>
        <p className="text-sm font-semibold text-slate-900">
          {action.title}
        </p>
        <p className="text-xs text-slate-500">
          {action.description}
        </p>
      </div>
      <span className="text-xs font-semibold text-indigo-600">
        {action.cta}
      </span>
    </button>
  );
}
