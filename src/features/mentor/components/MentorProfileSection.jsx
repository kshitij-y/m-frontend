export default function MentorProfileSection({
  title,
  description,
  actions,
  children,
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
