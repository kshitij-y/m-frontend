export default function EmptyState({
  title,
  description,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-sm">
      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}