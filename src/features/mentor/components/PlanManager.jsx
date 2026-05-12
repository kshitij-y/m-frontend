import { useEffect, useMemo, useState } from "react";

import { useCreatePlan } from "../../mentors/hooks/useCreatePlan";
import { useDeletePlan } from "../../mentors/hooks/useDeletePlan";
import { useUpdatePlan } from "../../mentors/hooks/useUpdatePlan";
import { useMyPlans } from "../../mentors/hooks/useMyPlans";

const DURATIONS = ["THREE_MONTH", "SIX_MONTH", "TWELVE_MONTH"];

const formatDuration = (duration) => {
  switch (duration) {
    case "THREE_MONTH":
      return "3 months";
    case "SIX_MONTH":
      return "6 months";
    case "TWELVE_MONTH":
      return "12 months";
    default:
      return duration || "Custom";
  }
};

const buildDraft = (plan) => ({
  title: plan?.title || "",
  description: plan?.description || "",
  price: plan?.price ?? "",
  isActive: plan?.isActive ?? true,
});

export default function PlanManager({ disabled = false }) {
  const { data, refetch } = useMyPlans();
  const plans = useMemo(() => data || [], [data]);

  const [form, setForm] = useState({
    duration: "THREE_MONTH",
    title: "",
    description: "",
    price: "",
    isActive: true,
  });

  const [drafts, setDrafts] = useState({});

  const { mutateAsync: createPlan, isPending: isCreating } =
    useCreatePlan();
  const { mutateAsync: updatePlan, isPending: isUpdating } =
    useUpdatePlan();
  const { mutateAsync: deletePlan, isPending: isDeleting } =
    useDeletePlan();

  useEffect(() => {
    const nextDrafts = {};
    plans.forEach((plan) => {
      nextDrafts[plan.id] = buildDraft(plan);
    });
    setDrafts(nextDrafts);
  }, [plans]);

  const handleCreate = async () => {
    if (!form.duration || form.price === "") {
      return;
    }

    await createPlan({
      duration: form.duration,
      title: form.title || undefined,
      description: form.description || undefined,
      price: Number(form.price),
      isActive: form.isActive,
    });

    setForm({
      duration: "THREE_MONTH",
      title: "",
      description: "",
      price: "",
      isActive: true,
    });

    await refetch();
  };

  const handleUpdate = async (plan) => {
    const draft = drafts[plan.id];
    if (!draft) {
      return;
    }

    await updatePlan({
      planId: plan.id,
      data: {
        title: draft.title || undefined,
        description: draft.description || undefined,
        price:
          draft.price === ""
            ? undefined
            : Number(draft.price),
        isActive: draft.isActive,
      },
    });

    await refetch();
  };

  const handleDelete = async (planId) => {
    await deletePlan(planId);
    await refetch();
  };

  const hasChanges = (plan) => {
    const draft = drafts[plan.id];
    if (!draft) {
      return false;
    }

    return (
      draft.title !== (plan.title || "") ||
      draft.description !== (plan.description || "") ||
      Number(draft.price || 0) !== Number(plan.price || 0) ||
      draft.isActive !== plan.isActive
    );
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-sm font-semibold text-slate-700">
          Create a new plan
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Duration
            </label>
            <select
              value={form.duration}
              onChange={(event) =>
                setForm({
                  ...form,
                  duration: event.target.value,
                })
              }
              disabled={disabled}
              className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-700"
            >
              {DURATIONS.map((duration) => (
                <option key={duration} value={duration}>
                  {formatDuration(duration)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Price
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(event) =>
                setForm({
                  ...form,
                  price: event.target.value,
                })
              }
              disabled={disabled}
              className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-700"
              placeholder="4999"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(event) =>
                setForm({
                  ...form,
                  title: event.target.value,
                })
              }
              disabled={disabled}
              className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-700"
              placeholder="Career accelerator"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Description
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(event) =>
                setForm({
                  ...form,
                  description: event.target.value,
                })
              }
              disabled={disabled}
              className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-700"
              placeholder="Bi-weekly mentorship sessions"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <label className="flex items-center gap-3 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(event) =>
                setForm({
                  ...form,
                  isActive: event.target.checked,
                })
              }
              disabled={disabled}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600"
            />
            Publish this plan
          </label>

          <button
            type="button"
            onClick={handleCreate}
            disabled={disabled || isCreating || form.price === ""}
            className="rounded-2xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCreating ? "Creating..." : "Create plan"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {plans.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-6 text-center text-sm text-slate-500">
            No plans created yet.
          </div>
        ) : (
          plans.map((plan) => {
            const draft = drafts[plan.id] || buildDraft(plan);
            return (
              <div
                key={plan.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      {formatDuration(plan.duration)} plan
                    </p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {plan.title || "Mentorship plan"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <input
                        type="checkbox"
                        checked={draft.isActive}
                        onChange={(event) =>
                          setDrafts({
                            ...drafts,
                            [plan.id]: {
                              ...draft,
                              isActive: event.target.checked,
                            },
                          })
                        }
                        disabled={disabled}
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                      />
                      Active
                    </label>
                    <button
                      type="button"
                      onClick={() => handleDelete(plan.id)}
                      disabled={disabled || isDeleting}
                      className="rounded-2xl border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Title
                    </label>
                    <input
                      type="text"
                      value={draft.title}
                      onChange={(event) =>
                        setDrafts({
                          ...drafts,
                          [plan.id]: {
                            ...draft,
                            title: event.target.value,
                          },
                        })
                      }
                      disabled={disabled}
                      className="mt-2 h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Price
                    </label>
                    <input
                      type="number"
                      value={draft.price}
                      onChange={(event) =>
                        setDrafts({
                          ...drafts,
                          [plan.id]: {
                            ...draft,
                            price: event.target.value,
                          },
                        })
                      }
                      disabled={disabled}
                      className="mt-2 h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm text-slate-700"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium text-slate-700">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={draft.description}
                    onChange={(event) =>
                      setDrafts({
                        ...drafts,
                        [plan.id]: {
                          ...draft,
                          description: event.target.value,
                        },
                      })
                    }
                    disabled={disabled}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleUpdate(plan)}
                    disabled={
                      disabled ||
                      isUpdating ||
                      !hasChanges(plan)
                    }
                    className="rounded-2xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isUpdating ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
