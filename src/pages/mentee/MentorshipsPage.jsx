import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";

import { useMyMentorships } from "../../features/mentorships/hooks/useMyMentorships";

export default function MentorshipsPage() {
  const {
    data: mentorships,
    isLoading,
    isError,
  } = useMyMentorships();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load mentorships"
        description="Please try again later."
      />
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          My Mentorships
        </h1>

        <p className="mt-2 text-gray-500">
          Track your active mentorships.
        </p>
      </div>

      {mentorships?.length === 0 ? (
        <EmptyState
          title="No mentorships yet"
          description="Start by booking a mentor."
        />
      ) : (
        <div className="grid gap-6">
          {mentorships.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {item?.mentor?.name}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    {item?.plan?.title}
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}