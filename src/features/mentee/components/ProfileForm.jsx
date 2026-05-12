export default function ProfileForm({
  values,
  onChange,
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Full name
          </label>
          <input
            type="text"
            value={values.name}
            onChange={(event) =>
              onChange({
                ...values,
                name: event.target.value,
              })
            }
            className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            value={values.email}
            onChange={(event) =>
              onChange({
                ...values,
                email: event.target.value,
              })
            }
            className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">
          Bio
        </label>
        <textarea
          rows={3}
          value={values.bio}
          onChange={(event) =>
            onChange({
              ...values,
              bio: event.target.value,
            })
          }
          className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">
          Interests
        </label>
        <textarea
          rows={2}
          value={values.interests}
          onChange={(event) =>
            onChange({
              ...values,
              interests: event.target.value,
            })
          }
          className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">
          Goals
        </label>
        <textarea
          rows={2}
          value={values.goals}
          onChange={(event) =>
            onChange({
              ...values,
              goals: event.target.value,
            })
          }
          className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">
          Learning focus
        </label>
        <textarea
          rows={2}
          value={values.learningFocus}
          onChange={(event) =>
            onChange({
              ...values,
              learningFocus: event.target.value,
            })
          }
          className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
        />
      </div>
    </div>
  );
}
