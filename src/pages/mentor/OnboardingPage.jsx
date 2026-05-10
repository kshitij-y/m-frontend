import { useMemo } from "react";

import Spinner from "../../components/ui/Spinner";
import Logo from "../../components/ui/Logo";

import ProfilePage from "./ProfilePage";
import PlansPage from "./PlansPage";

import ExpertiseSection from "../../features/mentors/components/ExpertiseSection";

import CalendarConnectCard from "../../features/calendar/components/CalendarConnectCard";

import { useOnboarding } from "../../features/mentors/hooks/useOnboarding";
import ProgressCard from "../../features/mentors/components/ProgressCard";
import ProfileCreateCard from "../../features/mentors/components/ProfileCreateCard";

const STEP_CONFIG = {
  profile: {
    badge: "Step 1 of 4",
    title: "Complete your mentor profile",
    description:
      "Add your mentor details so students can understand your expertise and experience.",
  },

  expertise: {
    badge: "Step 2 of 4",
    title: "Add your expertise",
    description:
      "Add your skills and mentoring domains one-by-one to continue onboarding.",
  },

  plans: {
    badge: "Step 3 of 4",
    title: "Create mentorship plans",
    description:
      "Setup your mentorship pricing and available durations.",
  },

  calendar: {
    badge: "Final Step",
    title: "Connect Google Calendar",
    description:
      "Recommended for automated scheduling and availability sync.",
  },
};

export default function OnboardingPage() {
  const {
    data,
    isLoading,
    refetch,
  } = useOnboarding();

  const onboarding = data;

  const steps = onboarding?.steps;

  const currentStep = useMemo(() => {
    if (!steps) return null;

    if (!steps.profile) {
      return "profile";
    }

    if (!steps.expertise) {
      return "expertise";
    }

    if (!steps.plans) {
      return "plans";
    }

    return "calendar";
  }, [steps]);

  const currentConfig = STEP_CONFIG[currentStep];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 px-6 py-10">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-120px] left-[-80px] h-[380px] w-[380px] rounded-full bg-indigo-100 blur-3xl opacity-70" />

        <div className="absolute bottom-[-140px] right-[-80px] h-[420px] w-[420px] rounded-full bg-violet-100 blur-3xl opacity-70" />
      </div>

      <div className="mx-auto max-w-3xl">
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <Logo />
        </div>

        {/* Card */}
        <div className="rounded-[32px] border border-slate-200/70 bg-white p-8 shadow-xl shadow-slate-200/40 lg:p-10">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
              <span className="h-2 w-2 rounded-full bg-indigo-600" />
              {currentConfig?.badge}
            </div>

            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                {currentConfig?.title}
              </h1>

              <p className="mt-3 text-base leading-7 text-slate-600">
                {currentConfig?.description}
              </p>
            </div>

            {/* Progress */}
            <div className="grid gap-3 sm:grid-cols-4">
              <ProgressCard
                label="Profile"
                completed={steps?.profile}
              />

              <ProgressCard
                label="Expertise"
                completed={steps?.expertise}
              />

              <ProgressCard
                label="Plans"
                completed={steps?.plans}
              />

              <ProgressCard
                label="Calendar"
                completed={steps?.googleCalendar}
              />
            </div>
          </div>

          {/* Dynamic Step */}
          <div className="mt-10">
            {currentStep === "profile" && (
              <ProfileCreateCard
                onSuccess={() => {
                  refetch();
                }}
              />
            )}

            {currentStep === "expertise" && (
              <ExpertiseSection
                embedded
                onSuccess={() => {
                  refetch();
                }}
              />
            )}

            {currentStep === "plans" && (
              <PlansPage
                embedded
                requireAllPlans
                onSuccess={() => {
                  refetch();
                }}
              />
            )}

            {currentStep === "calendar" && (
              <CalendarConnectCard />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
