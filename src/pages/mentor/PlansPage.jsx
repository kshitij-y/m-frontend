// src/pages/mentor/PlansPage.jsx

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import PlanCard from "../../features/mentors/components/PlanCard";

import { useMyPlans } from "../../features/mentors/hooks/useMyPlans";
import { useCreatePlan } from "../../features/mentors/hooks/useCreatePlan";
import { useDeletePlan } from "../../features/mentors/hooks/useDeletePlan";

const durations = [
  "THREE_MONTH",
  "SIX_MONTH",
  "TWELVE_MONTH",
];

export default function PlansPage({
  embedded = false,
  requireAllPlans = false,
  onSuccess,
}) {
  const { data } = useMyPlans();

  const plans = data?.plans || [];

  const { mutateAsync, isPending } =
    useCreatePlan();

  const { mutate: deletePlan } =
    useDeletePlan();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      duration: "THREE_MONTHS",
      price: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await mutateAsync({
        duration: values.duration,
        price: Number(values.price),
      });

      toast.success("Plan created");

      reset();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Failed to create plan");
    }
  };

  return (
    <div className={embedded ? "" : "space-y-8"}>
      {!embedded && (
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Mentorship Plans
          </h1>

          <p className="mt-2 text-slate-500">
            Configure your mentorship pricing.
          </p>
        </div>
      )}

      {requireAllPlans && (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
          Create atleast one mentorship plans to continue onboarding.
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Plan Duration
          </label>

          <select
            className="h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none focus:border-indigo-500"
            {...register("duration")}
          >
            {durations.map((duration) => (
              <option
                key={duration}
                value={duration}
              >
                {duration.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>

        <Input
          type="number"
          label="Price"
          placeholder="4999"
          error={errors.price?.message}
          {...register("price", {
            required: "Price is required",
          })}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="h-12 w-full rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {isPending
            ? "Creating..."
            : "Create Plan"}
        </Button>
      </form>

      <div className="mt-10 space-y-4">
        {plans.length > 0 ? (
          plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onDelete={() =>
                deletePlan(plan.id)
              }
            />
          ))
        ) : (
          <p className="text-sm text-slate-500">
            No plans created yet.
          </p>
        )}
      </div>
    </div>
  );
}