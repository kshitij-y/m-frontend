// src/pages/mentor/ProfilePage.jsx

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { useMyMentorProfile } from "../../features/mentors/hooks/useMyMentorProfile";
import { useUpdateMentorProfile } from "../../features/mentors/hooks/useUpdateMentorProfile";

export default function ProfilePage({
  embedded = false,
  onSuccess,
}) {
  const { data, isLoading } = useMyMentorProfile();

  const { mutateAsync, isPending } =
    useUpdateMentorProfile();

  const profile = data?.mentorProfile;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      headline: "",
      about: "",
      experienceYears: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        headline: profile.headline || "",
        about: profile.about || "",
        experienceYears:
          profile.experienceYears || "",
      });
    }
  }, [profile, reset]);

  const onSubmit = async (values) => {
    try {
      await mutateAsync({
        headline: values.headline,
        about: values.about,
        experienceYears: Number(
          values.experienceYears
        ),
      });

      toast.success("Profile updated");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <p className="text-sm text-slate-500">
        Loading profile...
      </p>
    );
  }

  return (
    <div className={embedded ? "" : "space-y-8"}>
      {!embedded && (
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Mentor Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your mentor profile.
          </p>
        </div>
      )}

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
          disabled={isPending}
          className="h-12 w-full rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {isPending
            ? "Saving..."
            : "Save & Continue"}
        </Button>
      </form>
    </div>
  );
}