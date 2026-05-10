
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { createMentorProfile } from "../api/createMentorProfile";

export default function ProfileCreateCard({
  onSuccess,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      headline: "",
      about: "",
      experienceYears: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await createMentorProfile({
        headline: values.headline,
        about: values.about,
        experienceYears: Number(
          values.experienceYears
        ),
        isAvailable: true,
      });

      toast.success(
        "Profile created successfully"
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Failed to create profile");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <Input
        label="Headline"
        placeholder="Senior Frontend Engineer"
        error={errors.headline?.message}
        {...register("headline", {
          required: "Headline is required",
        })}
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          About
        </label>

        <textarea
          rows={5}
          placeholder="Tell students about your experience"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500"
          {...register("about", {
            required: "About is required",
          })}
        />

        {errors.about && (
          <p className="mt-2 text-sm text-rose-500">
            {errors.about.message}
          </p>
        )}
      </div>

      <Input
        type="number"
        label="Years of Experience"
        placeholder="5"
        error={errors.experienceYears?.message}
        {...register("experienceYears", {
          required:
            "Experience is required",
        })}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700"
      >
        {isSubmitting
          ? "Creating..."
          : "Create Profile"}
      </Button>
    </form>
  );
}