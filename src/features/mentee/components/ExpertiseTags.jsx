export default function ExpertiseTags({ items }) {
  if (!items?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center text-sm text-slate-500">
        No expertise listed yet.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item.id}
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600"
        >
          {item.name}
        </span>
      ))}
    </div>
  );
}
