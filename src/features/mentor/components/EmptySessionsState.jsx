export default function EmptySessionsState({
  title,
  description,
}) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-6 text-sm text-slate-500">
      <p className="text-sm font-semibold text-slate-700">
        {title}
      </p>
      {description && (
        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}
