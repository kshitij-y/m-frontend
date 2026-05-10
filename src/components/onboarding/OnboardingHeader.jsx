import Card from "../ui/Card";

export default function OnboardingHeader({
  title,
  subtitle,
  children,
}) {
  return (
    <Card>
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="text-gray-500">
          {subtitle}
        </p>
      </div>

      {children ? (
        <div className="mt-6">{children}</div>
      ) : null}
    </Card>
  );
}
