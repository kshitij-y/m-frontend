import StatCard from "../../components/dashboard/StatCard";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";

import { useMyMentorships } from "../../features/mentorships/hooks/useMyMentorships";
export default function DashboardPage() {

  const {
  data: mentorships,
  isLoading,
  isError,
} = useMyMentorships();
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] bg-gradient-to-r from-[#111827] to-[#1f2937] p-8 text-white shadow-sm">
        <p className="text-sm text-gray-300">
          Good morning 👋
        </p>

        <h1 className="mt-3 text-5xl font-bold tracking-tight">
          Welcome back
        </h1>

        <p className="mt-4 max-w-xl text-gray-300">
          Continue your mentorship journey and
          track your learning progress.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          title="Total Sessions"
          value="12"
          subtitle="3 upcoming this week"
        />

        <StatCard
          title="Mentors Connected"
          value="4"
          subtitle="Across different domains"
        />

        <StatCard
          title="Completed"
          value="8"
          subtitle="Strong learning consistency"
        />
      </section>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
  <h2 className="text-xl font-bold">
    Upcoming Sessions
  </h2>

  <div className="mt-6">
    {isLoading ? (
      <Spinner />
    ) : isError ? (
      <EmptyState
        title="Failed to load sessions"
        description="Something went wrong while fetching mentorships."
      />
    ) : mentorships?.length === 0 ? (
      <EmptyState
        title="No mentorships yet"
        description="Start by connecting with mentors."
      />
    ) : (
      <div className="space-y-4">
        {mentorships.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-gray-100 p-4"
          >
            <p className="font-semibold">
              {item?.mentor?.name}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {item?.plan?.title}
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Status: {item.status}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
    </div>
  );
}