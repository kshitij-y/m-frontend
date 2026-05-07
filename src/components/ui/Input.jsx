export default function Input({
  label,
  error,
  type = "text",
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        className={`
          w-full rounded-xl border px-4 py-3 outline-none transition-all
          ${error ? "border-red-500" : "border-gray-300"}
          focus:border-black
        `}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}