import { useMemo, useState } from "react";

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
  const [prompt, setPrompt] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");

  const searchMentors = useAiMentorSearch();

  const mentors = useMemo(() => {
    return searchMentors.data?.mentors || [];
  }, [searchMentors.data]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!prompt.trim()) {
      return;
    }

    setLastPrompt(prompt.trim());
    await searchMentors.mutateAsync(prompt.trim());
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">
          AI Mentor Match
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Tell us what you need and we will rank the best mentors for you.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">
              What are you looking for?
            </label>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Share the skills, goals, and mentorship style you want."
              rows={4}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setPrompt(suggestion)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              {lastPrompt
                ? `Showing results for: “${lastPrompt}”`
                : ""}
            </p>
            <button
              type="submit"
              disabled={searchMentors.isPending}
              className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60"
            >
              {searchMentors.isPending ?
                "Matching mentors..."
                : "Find mentors"}
            </button>
          </div>
        </form>
      </div>

      {searchMentors.isError && (
        <div className="rounded-3xl border border-red-100 bg-red-50 p-5 text-sm text-red-600">
          {getErrorMessage(searchMentors.error)}
        </div>
      )}

      {searchMentors.isPending ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="h-56 rounded-3xl border border-slate-200 bg-white/60"
            />
          ))}
        </div>
      ) : mentors.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {mentors.map((mentor) => (
            <MentorMatchCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No matches yet"
          description="Share what you are looking for and we will surface the best mentors for you."
        />
      )}
    </div>
  );
}
