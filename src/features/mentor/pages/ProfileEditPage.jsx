import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import EmptyState from "../../../components/ui/EmptyState";

import { useMyProfile } from "../../users/hooks/useMyProfile";
import { useUpdateProfile } from "../../users/hooks/useUpdateProfile";
import { useMyMentorProfile } from "../../mentors/hooks/useMyMentorProfile";
import { useUpdateMentorProfile } from "../../mentors/hooks/useUpdateMentorProfile";
import { useCreateMentorProfile } from "../../mentors/hooks/useCreateMentorProfile";
import { useCalendarStatus } from "../../calendar/hooks/useCalendarStatus";
import { useDisconnectCalendar } from "../../calendar/hooks/useDisconnectCalendar";

import MentorProfileSection from "../components/MentorProfileSection";
import MentorProfileSkeleton from "../components/MentorProfileSkeleton";
import ExpertiseManager from "../components/ExpertiseManager";
import PlanManager from "../components/PlanManager";
import AvailabilityToggle from "../components/AvailabilityToggle";
import AvatarUpload from "../../mentee/components/AvatarUpload";

const buildUserValues = (user) => ({
  name: user?.name || "",
  avatar: user?.avatar || "",
  bio: user?.bio || "",
});

const buildMentorValues = (profile) => ({
  headline: profile?.headline || "",
  about: profile?.about || "",
  experienceYears:
    profile?.experienceYears ?? "",
});

export default function MentorProfileEditPage() {
  const navigate = useNavigate();

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useMyProfile();

  const {
    data: mentorProfile,
    isLoading: profileLoading,
    isError: profileError,
    error: mentorError,
    refetch: refetchMentorProfile,
  } = useMyMentorProfile();

  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateProfile();

  const { mutateAsync: updateMentor, isPending: isUpdatingMentor } =
    useUpdateMentorProfile();

  const { mutateAsync: createMentor, isPending: isCreatingMentor } =
    useCreateMentorProfile();

  const {
    data: calendarStatus,
    isLoading: calendarLoading,
  } = useCalendarStatus({ enabled: user?.role === "MENTOR" });

  const { mutate: disconnectCalendar, isPending: isDisconnecting } =
    useDisconnectCalendar();

  const [userValues, setUserValues] = useState(buildUserValues(user));
  const [mentorValues, setMentorValues] = useState(
    buildMentorValues(mentorProfile)
  );

  useEffect(() => {
    setUserValues(buildUserValues(user));
  }, [user]);

  useEffect(() => {
    setMentorValues(buildMentorValues(mentorProfile));
  }, [mentorProfile]);

  const profileMissing =
    profileError && mentorError?.response?.status === 404;

  const hasUserChanges = useMemo(() => {
    return (
      JSON.stringify(userValues) !==
      JSON.stringify(buildUserValues(user))
    );
  }, [userValues, user]);

  const hasMentorChanges = useMemo(() => {
    return (
      JSON.stringify(mentorValues) !==
      JSON.stringify(buildMentorValues(mentorProfile))
    );
  }, [mentorValues, mentorProfile]);

  const isUserValid = userValues.name.trim().length > 0;
  const isMentorValid = profileMissing
    ? mentorValues.headline.trim().length > 0 &&
      mentorValues.about.trim().length > 0 &&
      mentorValues.experienceYears !== ""
    : true;

  const canSave =
    (hasUserChanges || hasMentorChanges) &&
    isUserValid &&
    isMentorValid;

  if (userLoading || profileLoading) {
    return <MentorProfileSkeleton />;
  }

  if (userError || !user) {
    return (
      <EmptyState
        title="Unable to load profile"
        description="Please try again later."
      />
    );
  }

  if (profileError && !profileMissing) {
    return (
      <EmptyState
        title="Unable to load mentor profile"
        description="Please try again later."
      />
    );
  }

  const handleSave = async () => {
    if (hasUserChanges) {
      await updateUser({
        name: userValues.name,
        avatar: userValues.avatar,
        bio: userValues.bio,
      });
    }

    if (hasMentorChanges || profileMissing) {
      const payload = {
        headline: mentorValues.headline,
        about: mentorValues.about,
        experienceYears:
          mentorValues.experienceYears === ""
            ? undefined
            : Number(mentorValues.experienceYears),
      };

      if (profileMissing) {
        await createMentor({
          ...payload,
          isAvailable: true,
        });
      } else {
        await updateMentor(payload);
      }

      await refetchMentorProfile();
    }
  };

  const handleConnectCalendar = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    window.location.href = `${baseUrl}/calendar/google/connect`;
  };

  const handleCancel = () => {
    navigate("/mentor/profile");
  };

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-semibold text-slate-900">
          Edit Mentor Profile
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your mentorship profile, expertise, and mentorship plans.
        </p>
      </section>

      <MentorProfileSection
        title="Personal information"
        description="Keep your public mentor profile accurate and up to date."
      >
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Full name
              </label>
              <input
                type="text"
                value={userValues.name}
                onChange={(event) =>
                  setUserValues({
                    ...userValues,
                    name: event.target.value,
                  })
                }
                className="mt-2 h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm text-slate-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Headline
              </label>
              <input
                type="text"
                value={mentorValues.headline}
                onChange={(event) =>
                  setMentorValues({
                    ...mentorValues,
                    headline: event.target.value,
                  })
                }
                className="mt-2 h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm text-slate-700"
                placeholder="Senior Product Manager"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Bio / About
            </label>
            <textarea
              rows={4}
              value={mentorValues.about}
              onChange={(event) =>
                setMentorValues({
                  ...mentorValues,
                  about: event.target.value,
                })
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
              placeholder="Share your mentoring style, experience, and what mentees can expect."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Years of experience
              </label>
              <input
                type="number"
                value={mentorValues.experienceYears}
                onChange={(event) =>
                  setMentorValues({
                    ...mentorValues,
                    experienceYears: event.target.value,
                  })
                }
                className="mt-2 h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm text-slate-700"
                placeholder="5"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Mentor bio (short)
              </label>
              <input
                type="text"
                value={userValues.bio}
                onChange={(event) =>
                  setUserValues({
                    ...userValues,
                    bio: event.target.value,
                  })
                }
                className="mt-2 h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm text-slate-700"
                placeholder="Product leader helping mentees grow in strategy."
              />
            </div>
          </div>

          {profileMissing && (
            <p className="text-xs text-amber-600">
              Complete headline, about, and experience to create your mentor profile.
            </p>
          )}
        </div>
      </MentorProfileSection>

      <MentorProfileSection
        title="Profile image"
        description="Upload a professional avatar for your mentor profile."
      >
        <AvatarUpload
          value={userValues.avatar}
          onChange={(avatar) =>
            setUserValues({ ...userValues, avatar })
          }
        />
      </MentorProfileSection>

      <MentorProfileSection
        title="Expertise"
        description="Add or remove mentoring domains."
      >
        {profileMissing ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-6 text-sm text-slate-500">
            Create your mentor profile before adding expertise.
          </div>
        ) : (
          <ExpertiseManager
            items={mentorProfile?.expertise || []}
            onRefresh={refetchMentorProfile}
          />
        )}
      </MentorProfileSection>

      <MentorProfileSection
        title="Mentorship plans"
        description="Create and manage mentorship offerings for mentees."
      >
        {profileMissing ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-6 text-sm text-slate-500">
            Create your mentor profile before adding mentorship plans.
          </div>
        ) : (
          <PlanManager />
        )}
      </MentorProfileSection>

      <MentorProfileSection
        title="Availability"
        description="Control whether you are accepting new mentees."
      >
        <AvailabilityToggle
          value={mentorProfile?.isAvailable}
          disabled={profileMissing}
          onUpdated={refetchMentorProfile}
        />
      </MentorProfileSection>

      <MentorProfileSection
        title="Google Calendar"
        description="Connect your calendar for scheduling support."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-900">
              {calendarStatus?.connected
                ? "Calendar connected"
                : "Calendar not connected"}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {calendarStatus?.connected
                ? "Your calendar is connected and ready for scheduling."
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
      </MentorProfileSection>

      <MentorProfileSection title="Security">
        <button
          type="button"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
        >
          Change Password
        </button>
      </MentorProfileSection>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
        >
          Cancel
        </button>
        {!isUserValid && (
          <span className="text-xs text-rose-500">
            Name is required.
          </span>
        )}
        {profileMissing && !isMentorValid && (
          <span className="text-xs text-rose-500">
            Headline, about, and experience are required.
          </span>
        )}
        <button
          type="button"
          disabled={
            !canSave ||
            isUpdatingUser ||
            isUpdatingMentor ||
            isCreatingMentor
          }
          onClick={handleSave}
          className="rounded-2xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUpdatingUser || isUpdatingMentor || isCreatingMentor
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
