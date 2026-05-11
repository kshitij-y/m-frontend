const FilterLabel = ({ label }) => (
  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
    {label}
  </span>
);

export default function MentorFilters({
  expertiseOptions,
  filters,
  onChange,
}) {
  const update = (key, value) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <div className="space-y-2">
        <FilterLabel label="Expertise" />
        <select
          value={filters.expertise}
          onChange={(event) =>
            update("expertise", event.target.value)
          }
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
        >
          <option value="all">All expertise</option>
          {expertiseOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <FilterLabel label="Pricing" />
        <select
          value={filters.pricing}
          onChange={(event) =>
            update("pricing", event.target.value)
          }
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
        >
          <option value="all">Any price</option>
          <option value="under-50">Under $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-plus">$100+</option>
        </select>
      </div>

      <div className="space-y-2">
        <FilterLabel label="Availability" />
        <select
          value={filters.availability}
          onChange={(event) =>
            update("availability", event.target.value)
          }
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
        >
          <option value="all">Any</option>
          <option value="available">Available</option>
          <option value="unavailable">Not accepting</option>
        </select>
      </div>

      <div className="space-y-2">
        <FilterLabel label="Rating" />
        <select
          value={filters.rating}
          onChange={(event) =>
            update("rating", event.target.value)
          }
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
        >
          <option value="all">All ratings</option>
          <option value="4-plus">4.0+</option>
          <option value="4-5-plus">4.5+</option>
          <option value="5">5.0</option>
        </select>
      </div>

      <div className="space-y-2">
        <FilterLabel label="Sort" />
        <select
          value={filters.sort}
          onChange={(event) =>
            update("sort", event.target.value)
          }
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
        >
          <option value="top-rated">Top Rated</option>
          <option value="most-experienced">Most Experienced</option>
          <option value="lowest-price">Lowest Price</option>
          <option value="highest-price">Highest Price</option>
        </select>
      </div>
    </div>
  );
}
