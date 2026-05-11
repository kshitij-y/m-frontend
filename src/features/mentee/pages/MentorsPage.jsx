import { useMemo, useState } from "react";

import { useMentors } from "../../mentors/hooks/useMentors";

import MentorCard from "../../mentors/components/MentorCard";
import MentorSearchBar from "../../mentors/components/MentorSearchBar";
import MentorFilters from "../../mentors/components/MentorFilters";
import MentorCardSkeleton from "../../mentors/components/MentorCardSkeleton";
import EmptyMentorsState from "../../mentors/components/EmptyMentorsState";

const getMentorPrice = (mentor) => {
  const plans =
    mentor?.mentorProfile?.mentorPlans || [];
  const prices = plans
    .filter((plan) => plan.isActive)
    .map((plan) => plan.price)
    .filter((price) => price !== undefined && price !== null)
    .sort((a, b) => a - b);

  if (!prices.length) {
    return null;
  }

  return prices[0];
};

export default function FindMentorsPage() {
  const { data: mentors, isLoading, isError } =
    useMentors();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    expertise: "all",
    pricing: "all",
    availability: "all",
    rating: "all",
    sort: "top-rated",
  });

  const expertiseOptions = useMemo(() => {
    if (!mentors?.length) {
      return [];
    }

    const set = new Set();
    mentors.forEach((mentor) => {
      mentor?.mentorProfile?.expertise?.forEach(
        (item) => set.add(item.name)
      );
    });

    return Array.from(set).sort();
  }, [mentors]);

  const filteredMentors = useMemo(() => {
    if (!mentors?.length) {
      return [];
    }

    const term = search.trim().toLowerCase();

    const filtered = mentors.filter((mentor) => {
      const profile = mentor.mentorProfile || {};
      const expertise = profile.expertise || [];

      const matchesSearch = term
        ? [
            mentor.name,
            profile.headline,
            profile.about,
            ...expertise.map((item) => item.name),
          ]
            .filter(Boolean)
            .some((value) =>
              value.toLowerCase().includes(term)
            )
        : true;

      const matchesExpertise =
        filters.expertise === "all"
          ? true
          : expertise.some(
              (item) =>
                item.name === filters.expertise
            );

      const isAvailable =
        profile.isAvailable === true;

      const matchesAvailability =
        filters.availability === "all"
          ? true
          : filters.availability === "available"
            ? isAvailable
            : !isAvailable;

      const minPrice = getMentorPrice(mentor);
      const matchesPricing = (() => {
        if (filters.pricing === "all") {
          return true;
        }
        if (minPrice === null) {
          return false;
        }
        if (filters.pricing === "under-50") {
          return minPrice < 50;
        }
        if (filters.pricing === "50-100") {
          return minPrice >= 50 && minPrice <= 100;
        }
        if (filters.pricing === "100-plus") {
          return minPrice > 100;
        }
        return true;
      })();

      const matchesRating = true;

      return (
        matchesSearch &&
        matchesExpertise &&
        matchesAvailability &&
        matchesPricing &&
        matchesRating
      );
    });

    const sorted = [...filtered];

    sorted.sort((a, b) => {
      if (filters.sort === "most-experienced") {
        return (
          (b.mentorProfile?.experienceYears || 0) -
          (a.mentorProfile?.experienceYears || 0)
        );
      }

      if (filters.sort === "lowest-price") {
        return (
          (getMentorPrice(a) ?? Infinity) -
          (getMentorPrice(b) ?? Infinity)
        );
      }

      if (filters.sort === "highest-price") {
        return (
          (getMentorPrice(b) ?? 0) -
          (getMentorPrice(a) ?? 0)
        );
      }

      return 0;
    });

    return sorted;
  }, [mentors, search, filters]);

  const resetFilters = () => {
    setSearch("");
    setFilters({
      expertise: "all",
      pricing: "all",
      availability: "all",
      rating: "all",
      sort: "top-rated",
    });
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-semibold text-slate-900">
          Find Mentors
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Discover experienced mentors based on your goals, interests, and learning path.
        </p>
      </section>

      <section className="sticky top-4 z-10">
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <MentorSearchBar
            value={search}
            onChange={setSearch}
            onClear={() => setSearch("")}
          />
          <MentorFilters
            expertiseOptions={expertiseOptions}
            filters={filters}
            onChange={setFilters}
          />
        </div>
      </section>

      <section>
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <MentorCardSkeleton
                key={`mentor-skeleton-${index}`}
              />
            ))}
          </div>
        ) : isError ? (
          <EmptyMentorsState
            title="Unable to load mentors"
            description="We could not fetch mentors right now. Please try again later."
          />
        ) : filteredMentors.length === 0 ? (
          <EmptyMentorsState
            title="No mentors found"
            description="Try adjusting your search or filters to see more mentors."
            onReset={resetFilters}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
