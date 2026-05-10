import { useEffect } from "react";

import { useForm } from "react-hook-form";

import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

import { useMyMentorProfile } from "../../features/mentors/hooks/useMyMentorProfile";

import { useUpdateMentorProfile } from "../../features/mentors/hooks/useUpdateMentorProfile";
import ExpertiseSection from "../../features/mentors/components/ExpertiseSection";

export default function ProfilePage() {
    const {
        data: profile,
        isLoading,
        isError,
    } = useMyMentorProfile();

    const {
        mutateAsync: updateProfile,
        isPending,
    } = useUpdateMentorProfile();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    useEffect(() => {
        if (profile) {
            reset({
                headline:
                    profile.headline || "",

                about:
                    profile.about || "",
            });
        }
    }, [profile, reset]);

    const onSubmit = async (values) => {
        await updateProfile(values);
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return (
            <EmptyState
                title="Failed to load profile"
                description="Please try again later."
            />
        );
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <Card>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Mentor Profile
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Set up your mentor identity.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <Input
                        label="Headline"
                        placeholder="Senior Software Engineer"
                        {...register("headline")}
                    />

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            About
                        </label>

                        <textarea
                            rows={4}
                            className="
                w-full rounded-xl border border-gray-300 px-4 py-3 outline-none

                focus:border-black
              "
                            placeholder="Tell mentees about yourself..."
                            {...register("about")}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending
                            ? "Saving..."
                            : "Save Profile"}
                    </Button>
                </form>
                <ExpertiseSection
                    expertise={profile?.expertise || []}
                />
            </Card>
        </div>
    );
}