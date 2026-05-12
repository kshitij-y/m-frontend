import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import EmptyState from "../../../components/ui/EmptyState";

import { useMyProfile } from "../../users/hooks/useMyProfile";
import { useUpdateProfile } from "../../users/hooks/useUpdateProfile";
import { useCalendarStatus } from "../../calendar/hooks/useCalendarStatus";
import { useDisconnectCalendar } from "../../calendar/hooks/useDisconnectCalendar";

import ProfileSection from "../components/ProfileSection";
import ProfileForm from "../components/ProfileForm";
import AvatarUpload from "../components/AvatarUpload";
import ProfileSkeleton from "../components/ProfileSkeleton";

const buildValues = (profile) => ({
  name: profile?.name || "",
  email: profile?.email || "",
  avatar: profile?.avatar || "",
  bio: profile?.bio || "",
  interests: profile?.interests || "",
  goals: profile?.goals || "",
  learningFocus: profile?.learningFocus || "",
});

export default function ProfileEditPage() {
  const navigate = useNavigate();

  const {
    data: profile,
    isLoading,
    isError,
  } = useMyProfile();

  const { mutateAsync: updateProfile, isPending } =
    useUpdateProfile();

  const isMentor = profile?.role === "MENTOR";
  const {
    data: calendarStatus,
    isLoading: calendarLoading,
  } = useCalendarStatus({ enabled: isMentor });

  const { mutate: disconnectCalendar, isPending: isDisconnecting } =
    useDisconnectCalendar();

  const [values, setValues] = useState(buildValues(profile));

  const isValid =
    values.name.trim().length > 0 &&
    values.email.trim().length > 0;

  useEffect(() => {
    setValues(buildValues(profile));
  }, [profile]);

  const hasChanges = useMemo(() => {
    const initial = buildValues(profile);
    return JSON.stringify(values) !== JSON.stringify(initial);
  }, [values, profile]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError || !profile) {
    return (
      <EmptyState
        title="Unable to load profile"
        description="Please try again later."
      />
    );
  }

  const handleSave = async () => {
    await updateProfile({
      name: values.name,
      email: values.email,
      avatar: values.avatar,
      bio: values.bio,
      interests: values.interests,
      goals: values.goals,
      learningFocus: values.learningFocus,
    });
  };

  const handleConnectCalendar = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    window.location.href =
      `${baseUrl}/calendar/google/connect`;
  };

  const handleCancel = () => {
    navigate("/mentee/profile");
  };

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-semibold text-slate-900">
          Edit Profile
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Update your personal information and mentorship preferences.
        </p>
      </section>

      <ProfileSection
        title="Personal information"
        description="Keep your profile updated for better mentorship matches."
      >
        <ProfileForm values={values} onChange={setValues} />
      </ProfileSection>

      <ProfileSection
        title="Profile image"
        description="Show a friendly face to your mentors."
      >
        <AvatarUpload
          value={values.avatar}
          onChange={(avatar) =>
            setValues({ ...values, avatar })
          }
        />
      </ProfileSection>

      <ProfileSection
        title="Google Calendar"
        description="Calendar connections are managed by mentors."
      >
        {isMentor ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">
                {calendarStatus?.connected
                  ? "Calendar connected"
                  : "Calendar not connected"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {calendarStatus?.connected
                  ? "Your calendar is connected and ready."
                  : "Connect your calendar to sync sessions."}
              </p>
            </div>
            {calendarStatus?.connected ? (
              <button
                type="button"
                disabled={isDisconnecting}
                onClick={() => disconnectCalendar()}
                className="rounded-2xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600"
              >
                {isDisconnecting ? "Disconnecting..." : "Disconnect"}
              </button>
            ) : (
              <button
                type="button"
                disabled={calendarLoading}
                onClick={handleConnectCalendar}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500"
              >
                Connect Google Calendar
              </button>
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            Calendar sync is managed by your mentor.
          </p>
        )}
      </ProfileSection>

      <ProfileSection title="Security">
        <button
          type="button"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
        >
          Change Password
        </button>
      </ProfileSection>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
        >
          Cancel
        </button>
        {!isValid && (
          <span className="text-xs text-rose-500">
            Name and email are required.
          </span>
        )}
        <button
          type="button"
          disabled={!hasChanges || !isValid || isPending}
          onClick={handleSave}
          className="rounded-2xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
