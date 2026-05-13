import {
  Sparkles,
  Wand2,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import { useAiMentorSearch } from "../../ai-match/hooks/useAiMentorSearch";

import MentorMatchCard from "../../ai-match/components/MentorMatchCard";

import EmptyState from "../../../components/ui/EmptyState";

import { getErrorMessage } from "../../../utils/getErrorMessage";

const SUGGESTIONS = [
  "I need a React mentor for interview preparation",

  "Looking for a backend mentor experienced in scalable Node.js systems",

  "Need DevOps mentorship for Kubernetes and Docker",
];

export default function AiMentorMatchPage() {
  const [prompt, setPrompt] =
    useState("");

  const [
    lastPrompt,
    setLastPrompt,
  ] = useState("");

  const searchMentors =
    useAiMentorSearch();

  const mentors = useMemo(() => {
    return (
      searchMentors.data
        ?.mentors || []
    );
  }, [searchMentors.data]);

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      if (!prompt.trim()) {
        return;
      }

      setLastPrompt(
        prompt.trim()
      );

      await searchMentors.mutateAsync(
        prompt.trim()
      );
    };

  return (
    <div className="space-y-8 pb-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-violet-50/60 p-7 shadow-sm">
        {/* BG */}
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-violet-100/40 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-indigo-100/30 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-violet-700 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />

              AI Powered Matching
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-slate-500">
                Find the right
                mentor faster
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
                AI Mentor Match
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Describe your goals,
                skills, learning
                focus, or mentorship
                expectations and get
                personalized mentor
                recommendations
                tailored to your
                growth journey.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                Personalized mentor
                discovery
              </div>

              <div className="rounded-2xl border border-violet-100 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
                AI ranked matches
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid w-full max-w-md grid-cols-2 gap-4">
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
              <p className="text-sm font-medium text-slate-500">
                Match Quality
              </p>

              <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Smart
              </h3>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
              <p className="text-sm font-medium text-slate-500">
                Recommendations
              </p>

              <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Personalized
              </h3>
            </div>

            <div className="col-span-2 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Mentor Discovery
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    Find mentors that
                    align with your
                    learning goals
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    AI analyzes your
                    requirements and
                    surfaces the most
                    relevant mentors.
                  </p>
                </div>

                <div className="rounded-2xl bg-violet-50 p-3 text-violet-700">
                  <Wand2 className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >
          <div>
            <label className="text-sm font-semibold text-slate-800">
              What kind of mentor
              are you looking for?
            </label>

            <textarea
              value={prompt}
              onChange={(
                event
              ) =>
                setPrompt(
                  event.target.value
                )
              }
              placeholder="Describe your goals, preferred technologies, mentorship style, or what you want help with."
              rows={5}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>

          {/* SUGGESTIONS */}
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map(
              (
                suggestion
              ) => (
                <button
                  key={
                    suggestion
                  }
                  type="button"
                  onClick={() =>
                    setPrompt(
                      suggestion
                    )
                  }
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                >
                  {suggestion}
                </button>
              )
            )}
          </div>

          {/* FOOTER */}
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              {lastPrompt
                ? `Showing results for: “${lastPrompt}”`
                : "Describe your mentorship goals to get personalized mentor recommendations."}
            </p>

            <button
              type="submit"
              disabled={
                searchMentors.isPending
              }
              className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {searchMentors.isPending
                ? "Matching mentors..."
                : "Find mentors"}
            </button>
          </div>
        </form>
      </section>

      {/* ERROR */}
      {searchMentors.isError && (
        <div className="rounded-3xl border border-red-100 bg-red-50 p-5 text-sm text-red-600">
          {getErrorMessage(
            searchMentors.error
          )}
        </div>
      )}

      {/* RESULTS */}
      {searchMentors.isPending ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {Array.from({
            length: 6,
          }).map(
            (_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-64 rounded-3xl border border-slate-200 bg-white/60"
              />
            )
          )}
        </div>
      ) : mentors.length > 0 ? (
        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Recommended mentors
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Ranked mentor matches
              based on your
              preferences and
              learning goals.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {mentors
              .filter(Boolean)
              .map((mentor) => (
                <MentorMatchCard
                  key={mentor.id}
                  mentor={mentor}
                />
              ))}
          </div>
        </section>
      ) : (
        <EmptyState
          title="No matches yet"
          description="Describe what you are looking for and we will surface the most relevant mentors for you."
        />
      )}
    </div>
  );
}