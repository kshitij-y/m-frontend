export default function AvatarUpload({ value, onChange }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-lg font-semibold text-indigo-700">
        {value ? (
          <img
            src={value}
            alt="Profile avatar"
            className="h-16 w-16 rounded-2xl object-cover"
          />
        ) : (
          "M"
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-700">
          Profile photo
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Upload will be available soon. You can paste an image URL for now.
        </p>
        <input
          type="text"
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://"
          className="mt-3 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
        />
      </div>
    </div>
  );
}
