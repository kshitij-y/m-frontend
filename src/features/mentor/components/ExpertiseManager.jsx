import { useMemo, useState } from "react";

import { useAddExpertise } from "../../mentors/hooks/useAddExpertise";
import { useDeleteExpertise } from "../../mentors/hooks/useDeleteExpertise";

export default function ExpertiseManager({
  items,
  onRefresh,
  disabled = false,
}) {
  const [value, setValue] = useState("");
  const { mutateAsync, isPending } = useAddExpertise();
  const { mutateAsync: removeExpertise, isPending: isRemoving } =
    useDeleteExpertise();

  const expertise = useMemo(() => items || [], [items]);

  const handleAdd = async () => {
    if (!value.trim()) {
      return;
    }

    await mutateAsync({ name: value.trim() });

    setValue("");

    if (onRefresh) {
      onRefresh();
    }
  };

  const handleRemove = async (itemId) => {
    await removeExpertise(itemId);

    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          disabled={disabled}
          placeholder="Add expertise (e.g., React, DevOps)"
          className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={disabled || isPending}
          className="h-12 rounded-2xl bg-indigo-600 px-6 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Adding..." : "Add expertise"}
        </button>
      </div>

      {expertise.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {expertise.map((item) => (
            <span
              key={item.id}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2"
            >
              <span className="text-sm font-medium text-slate-700">
                {item.name}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                disabled={disabled || isRemoving}
                className="text-xs font-semibold text-rose-500 transition hover:text-rose-600 disabled:opacity-60"
              >
                Remove
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-6 text-center text-sm text-slate-500">
          No expertise added yet.
        </div>
      )}
    </div>
  );
}
