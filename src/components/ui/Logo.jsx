export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-sm font-bold text-white shadow-sm">
        MC
      </div>

      <div>
        <h1 className="text-lg font-semibold tracking-tight">
          MentorConnect
        </h1>

        <p className="text-xs text-slate-500">
          Learn faster with expert mentors
        </p>
      </div>
    </div>
  );
}