import { useState } from "react";

import { X } from "lucide-react";

import Spinner from "../../../components/ui/Spinner";
import EmptyState from "../../../components/ui/EmptyState";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { useMyMentorProfile } from "../hooks/useMyMentorProfile";

import { useAddExpertise } from "../hooks/useAddExpertise";
import { useDeleteExpertise } from "../hooks/useDeleteExpertise";

export default function ExpertiseSection() {
  const [value, setValue] = useState("");

  const {
    data: profile,
    isLoading,
    isError,
  } = useMyMentorProfile();

  const {
    mutateAsync: addExpertiseMutation,
    isPending: addPending,
  } = useAddExpertise();

  const {
    mutateAsync: deleteExpertiseMutation,
    isPending: deletePending,
  } = useDeleteExpertise();

  const expertise =
    profile?.expertises || [];

  const handleAdd = async () => {
    if (!value.trim()) return;

    await addExpertiseMutation({
      name: value,
    });

    setValue("");
  };

  const handleDelete = async (id) => {
    await deleteExpertiseMutation(id);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load expertise"
        description="Please try again later."
      />
    );
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Expertise
        </h2>

        <p className="mt-2 text-gray-500">
          Add and manage your expertise areas.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <Input
            placeholder="e.g. React, Node.js, System Design"
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
          />
        </div>

        <Button
          type="button"
          onClick={handleAdd}
          disabled={addPending}
          className="sm:w-fit sm:px-8"
        >
          {addPending ? "Adding..." : "Add"}
        </Button>
      </div>

      <div className="mt-8">
        {expertise.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center">
            <p className="text-sm text-gray-500">
              No expertise added yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {expertise.map((item) => (
              <div
                key={item.id}
                className="
                  flex items-center gap-2 rounded-full
                  bg-gray-100 px-4 py-2
                  transition hover:bg-gray-200
                "
              >
                <span className="text-sm font-medium text-gray-700">
                  {item.name}
                </span>

                <button
                  type="button"
                  disabled={deletePending}
                  onClick={() =>
                    handleDelete(item.id)
                  }
                  className="
                    rounded-full p-1 text-gray-500
                    transition hover:bg-gray-300 hover:text-black
                  "
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}