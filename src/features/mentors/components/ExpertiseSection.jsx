// src/features/mentors/components/ExpertiseSection.jsx

import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../../../components/ui/Button";

import { useMyMentorProfile } from "../hooks/useMyMentorProfile";
import { useAddExpertise } from "../hooks/useAddExpertise";
import { useDeleteExpertise } from "../hooks/useDeleteExpertise";

export default function ExpertiseSection({
  embedded = false,
  onSuccess,
}) {
  const [name, setName] = useState("");

  const { data } = useMyMentorProfile();

  const { mutateAsync, isPending } =
    useAddExpertise();

  const { mutate: removeExpertise } =
    useDeleteExpertise();

  const expertise =
    data?.mentorProfile?.expertise || [];

  const handleAdd = async () => {
    if (!name.trim()) return;

    try {
      await mutateAsync({
        name,
      });

      toast.success("Expertise added");

      setName("");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Failed to add expertise");
    }
  };

  return (
    <div className={embedded ? "" : "space-y-8"}>
      {!embedded && (
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Expertise
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your expertise.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {/* INPUT ROW */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="React, Node.js, DevOps"
              className="h-12 w-m rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 max-w-full outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <Button
            type="button"
            disabled={isPending}
            onClick={handleAdd}
            className="h-12 min-w-[170px] rounded-2xl bg-indigo-600 px-6 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            {isPending
              ? "Adding..."
              : "Add Expertise"}
          </Button>
        </div>

        {/* EXPERTISE LIST */}
        {expertise.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {expertise.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2"
              >
                <span className="text-sm font-medium text-slate-700">
                  {item.expertise?.name ||
                    item.name}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    removeExpertise(item.id)
                  }
                  className="text-sm font-medium text-rose-500 transition hover:text-rose-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
            <p className="text-sm text-slate-500">
              No expertise added yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}