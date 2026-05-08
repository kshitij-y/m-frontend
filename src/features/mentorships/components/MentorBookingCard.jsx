import Button from "../../../components/ui/Button";

export default function MentorBookingCard({
  mentorship,
  onStatusChange,
  isPending,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {mentorship?.mentee?.name}
          </h2>

          <p className="mt-2 text-gray-500">
            {mentorship?.plan?.title}
          </p>

          <div className="mt-4">
            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium">
              {mentorship.status}
            </span>
          </div>
        </div>

        {mentorship.status === "PENDING" && (
          <div className="flex gap-3">
            <Button
              disabled={isPending}
              onClick={() =>
                onStatusChange(
                  mentorship.id,
                  "ACCEPTED"
                )
              }
              className="bg-green-600 hover:bg-green-700"
            >
              Accept
            </Button>

            <Button
              disabled={isPending}
              onClick={() =>
                onStatusChange(
                  mentorship.id,
                  "REJECTED"
                )
              }
              className="bg-red-600 hover:bg-red-700"
            >
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}