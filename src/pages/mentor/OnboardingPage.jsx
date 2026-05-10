import { useSelector } from "react-redux";

import Card from "../../components/ui/Card";

import ProfilePage from "./ProfilePage";
import PlansPage from "./PlansPage";

export default function OnboardingPage() {
  const { user } = useSelector((state) => state.auth);
  const steps = user?.onboardingStatus?.steps;

  return (
    <div className="space-y-8">
      <div className="mx-auto max-w-4xl">
        <Card>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight">
              Mentor Onboarding
            </h1>

            <p className="text-gray-500">
              Complete your profile, expertise, and plans to
              unlock your mentor dashboard.
            </p>
          </div>

          {steps && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-sm text-gray-500">Profile</p>
                <p className="mt-1 text-sm font-semibold">
                  {steps.profile ? "Complete" : "Incomplete"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-sm text-gray-500">Expertise</p>
                <p className="mt-1 text-sm font-semibold">
                  {steps.expertise ? "Complete" : "Incomplete"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-sm text-gray-500">Plans</p>
                <p className="mt-1 text-sm font-semibold">
                  {steps.plans ? "Complete" : "Incomplete"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-sm text-gray-500">
                  Google Calendar (optional)
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {steps.googleCalendar
                    ? "Connected"
                    : "Not connected"}
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <ProfilePage />
      <PlansPage />
    </div>
  );
}
