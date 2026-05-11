import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import EmptyState from "../../../components/ui/EmptyState";

import { useMentor } from "../../mentors/hooks/useMentor";
import { useMentorPlans } from "../../mentors/hooks/useMentorPlans";
import { useBookMentorship } from "../../mentorships/hooks/useBookMentorship";

import SectionHeader from "../components/SectionHeader";
import MentorHeader from "../components/MentorHeader";
import ExpertiseTags from "../components/ExpertiseTags";
import MentorPlanCard from "../components/MentorPlanCard";
import MentorProfileSkeleton from "../components/MentorProfileSkeleton";
import BookingModal from "../components/BookingModal";
import MentorReviewCard from "../components/MentorReviewCard";

export default function MentorDetailsPage() {
  const { mentorId } = useParams();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const {
    data: mentor,
    isLoading: isMentorLoading,
    isError: isMentorError,
  } = useMentor(mentorId);

  const {
    data: plans,
    isLoading: isPlansLoading,
    isError: isPlansError,
  } = useMentorPlans(mentorId);

  const { bookMentorship, isPending } =
    useBookMentorship();

  const profile = mentor?.mentorProfile;
  const isAvailable = profile?.isAvailable ?? true;

  const sortedPlans = useMemo(() => {
    if (!plans?.length) {
      return [];
    }

    return [...plans].sort((a, b) => a.price - b.price);
  }, [plans]);

  if (isMentorLoading || isPlansLoading) {
    return <MentorProfileSkeleton />;
  }

  if (isMentorError || !mentor) {
    return (
      <EmptyState
        title="Mentor not found"
        description="We could not load this mentor profile."
      />
    );
  }

  return (
    <div className="space-y-8">
      <MentorHeader mentor={mentor} />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader
          title="About"
          description="Get to know your mentor in more detail."
        />
        <p className="mt-4 text-sm leading-7 text-slate-600">
          {profile?.about ||
            "This mentor has not added an about section yet."}
        </p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader
          title="Expertise"
          description="Areas this mentor can guide you through."
        />
        <div className="mt-4">
          <ExpertiseTags items={profile?.expertise || []} />
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Mentorship plans"
          description="Choose a plan that matches your goals and momentum."
        />

        {isPlansError ? (
          <EmptyState
            title="Unable to load plans"
            description="Mentorship plans are unavailable right now."
          />
        ) : sortedPlans.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sortedPlans.map((plan) => (
              <MentorPlanCard
                key={plan.id}
                plan={plan}
                disabled={!isAvailable || isPending}
                onSelect={() => setSelectedPlan(plan)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No plans available"
            description="This mentor has not published any plans yet."
          />
        )}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader
          title="Reviews"
          description="Feedback from mentees will appear here."
        />
        <div className="mt-4">
          <MentorReviewCard />
        </div>
      </section>

      <BookingModal
        mentor={mentor}
        plan={selectedPlan}
        isOpen={Boolean(selectedPlan)}
        isPending={isPending}
        onClose={() => setSelectedPlan(null)}
        onConfirm={() => {
          if (!selectedPlan) {
            return;
          }

          bookMentorship({
            mentorId: mentor.id,
            planId: selectedPlan.id,
          });
          setSelectedPlan(null);
        }}
      />
    </div>
  );
}
