import { Trash2 } from "lucide-react";

export default function MentorPlanCard({
  plan,
  onDelete,
  isDeleting,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold">
            {plan.title}
          </h3>

          <p className="mt-3 text-sm text-gray-500">
            {plan.description}
          </p>
        </div>

        <button
          disabled={isDeleting}
          onClick={() => onDelete(plan.id)}
          className="
            rounded-xl p-2 text-gray-500 transition

            hover:bg-gray-100
            hover:text-red-500
          "
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="mt-6">
        <p className="text-4xl font-bold">
          ₹{plan.price}
        </p>
      </div>
    </div>
  );
}