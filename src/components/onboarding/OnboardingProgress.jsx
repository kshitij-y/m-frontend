import OnboardingProgressCard from "./OnboardingProgressCard";

export default function OnboardingProgress({ steps }) {
  if (!steps) return null;

  const items = [
    {
      label: "Profile",
      value: steps.profile ? "Complete" : "Incomplete",
    },
    {
      label: "Expertise",
      value: steps.expertise ? "Complete" : "Incomplete",
    },
    {
      label: "Plans",
      value: steps.plans ? "Complete" : "Incomplete",
    },
    {
      label: "Google Calendar (optional)",
      value: steps.googleCalendar
        ? "Connected"
        : "Not connected",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <OnboardingProgressCard
          key={item.label}
          label={item.label}
          value={item.value}
        />
      ))}
    </div>
  );
}
