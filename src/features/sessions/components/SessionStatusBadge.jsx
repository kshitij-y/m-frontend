const statusColorMap = {
  SCHEDULED: "bg-indigo-100 text-indigo-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  MISSED: "bg-gray-100 text-gray-700",
};

function toTitleCase(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function SessionStatusBadge({ status }) {
  const colorClasses = statusColorMap[status] || "bg-gray-100 text-gray-600";

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${colorClasses}`}
    >
      {toTitleCase(status)}
    </span>
  );
}
