import { useForm } from "react-hook-form";

import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

import MentorPlanCard from "../../features/mentors/components/MentorPlanCard";

import { useMyPlans } from "../../features/mentors/hooks/useMyPlans";

import { useCreatePlan } from "../../features/mentors/hooks/useCreatePlan";

import { useDeletePlan } from "../../features/mentors/hooks/useDeletePlan";
const PLAN_OPTIONS = [
  {
    value: "THREE_MONTH",
    label: "3 Months",
    title: "3 Month Mentorship",
  },

  {
    value: "SIX_MONTH",
    label: "6 Months",
    title: "6 Month Mentorship",
  },

  {
    value: "TWELVE_MONTH",
    label: "12 Months",
    title: "12 Month Mentorship",
  },
];

export default function PlansPage() {
  const {
    data: plans,
    isLoading,
    isError,
  } = useMyPlans();

  const {
    mutateAsync: createPlan,
    isPending: createPending,
  } = useCreatePlan();

  const {
    mutateAsync: deletePlan,
    isPending: deletePending,
  } = useDeletePlan();

  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      durationType: "THREE_MONTH",
    },
  });

  const selectedDuration =
    watch("durationType");

  const onSubmit = async (values) => {
    const selectedPlan =
      PLAN_OPTIONS.find(
        (item) =>
          item.value === values.durationType
      );

    await createPlan({
      duration: values.durationType,

      title: selectedPlan.title,

      // description:
      // selectedPlan.description,

      price: Number(values.price),
    });

    reset({
      durationType: "THREE_MONTH",
      price: "",
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load plans"
        description="Please try again later."
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <Card>
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Mentorship Plans
          </h1>

          <p className="mt-2 text-gray-500">
            Configure your mentorship pricing.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Plan Duration
            </label>

            <select
              className="
                w-full rounded-xl border border-gray-300
                px-4 py-3 outline-none

                focus:border-black
              "
              {...register("durationType")}
            >
              {PLAN_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 
            Future backend-driven description support
            
            <textarea />
          */}

          <Input
            label="Price"
            type="number"
            placeholder="4999"
            {...register("price")}
          />

          <Button
            type="submit"
            disabled={createPending}
          >
            {createPending
              ? "Creating..."
              : "Create Plan"}
          </Button>
        </form>
      </Card>

      {!plans || plans.length === 0 ? (
        <EmptyState
          title="No plans created"
          description="Create your mentorship plans."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <MentorPlanCard
              key={plan.id}
              plan={plan}
              isDeleting={deletePending}
              onDelete={deletePlan}
            />
          ))}
        </div>
      )}
    </div>
  );
}