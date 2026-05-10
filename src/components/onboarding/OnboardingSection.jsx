export default function OnboardingSection({
  title,
  description,
  children,
}) {
  return (
    <section className="space-y-4">
      {title ? (
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {title}
          </h2>
          {description ? (
            <p className="mt-2 text-gray-500">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      {children}
    </section>
  );
}
