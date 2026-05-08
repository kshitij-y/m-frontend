import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";

import MentorBookingCard from "../../features/mentorships/components/MentorBookingCard";

import { useMyMentorships } from "../../features/mentorships/hooks/useMyMentorships";

import { useUpdateMentorshipStatus } from "../../features/mentorships/hooks/useUpdateMentorshipStatus";

export default function BookingsPage() {
  const {
    data: mentorships,
    isLoading,
    isError,
  } = useMyMentorships();

  const {
    mutateAsync: updateStatus,
    isPending,
  } = useUpdateMentorshipStatus();

  const handleStatusChange = async (
    id,
    status
  ) => {
    await updateStatus({
      id,
      status,
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load bookings"
        description="Please try again later."
      />
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Mentorship Bookings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage incoming mentorship requests.
        </p>
      </div>

      {!mentorships ||
      mentorships.length === 0 ? (
        <EmptyState
          title="No mentorship requests"
          description="Bookings will appear here."
        />
      ) : (
        <div className="grid gap-6">
          {mentorships.map((item) => (
            <MentorBookingCard
              key={item.id}
              mentorship={item}
              isPending={isPending}
              onStatusChange={
                handleStatusChange
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}