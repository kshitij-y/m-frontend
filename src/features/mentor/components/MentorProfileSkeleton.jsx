export default function MentorProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="h-20 w-20 rounded-3xl bg-slate-200" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-48 rounded bg-slate-200" />
            <div className="h-4 w-32 rounded bg-slate-200" />
            <div className="h-4 w-full max-w-xl rounded bg-slate-200" />
            <div className="h-4 w-3/4 max-w-lg rounded bg-slate-200" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-28 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="h-3 w-24 rounded bg-slate-200" />
            <div className="mt-4 h-6 w-16 rounded bg-slate-200" />
          </div>
        ))}
      </div>

      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="h-4 w-40 rounded bg-slate-200" />
          <div className="mt-4 h-24 w-full rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}
