import Logo from "../components/ui/Logo";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-120px] left-[-80px] h-[380px] w-[380px] rounded-full bg-indigo-100 blur-3xl opacity-70" />
        <div className="absolute bottom-[-140px] right-[-80px] h-[420px] w-[420px] rounded-full bg-violet-100 blur-3xl opacity-70" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Logo />
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="hidden rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 sm:block"
            >
              Login
            </a>

            <a
              href="/signup"
              className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl grid-cols-1 items-center gap-14 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
          {/* Left */}
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
              <span className="h-2 w-2 rounded-full bg-indigo-600" />
              Accelerate your career growth
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 lg:text-7xl">
              Find mentors.
              <br />
              Build skills.
              <br />
              Grow faster.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600 lg:text-xl">
              MentorConnect helps students and professionals connect with
              experienced mentors for career guidance, interview prep,
              project reviews, and long-term mentorship.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/signup"
                className="flex h-12 items-center justify-center rounded-2xl bg-indigo-600 px-7 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Start Learning
              </a>

              <a
                href="/login"
                className="flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-7 text-base font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Login
              </a>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-10">
              <div>
                <h3 className="text-3xl font-bold text-slate-900">500+</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Active learners
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900">120+</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Expert mentors
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900">1:1</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Personalized mentorship
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[560px]">
              {/* Main Card */}
              <div className="rounded-[32px] border border-slate-200/70 bg-white p-6 shadow-xl shadow-slate-200/40 backdrop-blur">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Upcoming Session
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-slate-900">
                      System Design Mentorship
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                    Live
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-lg font-bold text-indigo-700">
                    RK
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Rahul Kapoor
                    </h4>
                    <p className="text-sm text-slate-500">
                      Senior Software Engineer • Google
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                    <p className="text-sm text-slate-500">Sessions</p>
                    <h3 className="mt-2 text-3xl font-bold text-slate-900">
                      28
                    </h3>
                  </div>

                  <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                    <p className="text-sm text-slate-500">Satisfaction</p>
                    <h3 className="mt-2 text-3xl font-bold text-slate-900">
                      4.9★
                    </h3>
                  </div>
                </div>

                <div className="mt-6 rounded-3xl bg-indigo-600 p-6 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-indigo-100">
                        Personalized mentorship
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold leading-tight">
                        Get guidance from industry experts.
                      </h3>
                    </div>

                    <div className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                      AI Matching
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-slate-200/70 bg-white py-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Features
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
              Everything you need for meaningful mentorship.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: '1:1 Mentorship',
                desc: 'Connect directly with experienced mentors for personalized learning and career guidance.',
              },
              {
                title: 'Structured Plans',
                desc: 'Choose mentorship plans designed for interview prep, development, and long-term growth.',
              },
              {
                title: 'Career Guidance',
                desc: 'Get roadmap planning, resume reviews, and industry insights from professionals.',
              },
              {
                title: 'Project Reviews',
                desc: 'Receive detailed feedback on your projects, architecture, and technical decisions.',
              },
              {
                title: 'Flexible Scheduling',
                desc: 'Book sessions based on mentor availability and your preferred learning pace.',
              },
              {
                title: 'AI-Powered Matching',
                desc: 'Find the right mentor faster based on goals, skills, and interests.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-[28px] border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-slate-200/40"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-lg font-bold text-indigo-700">
                  ✦
                </div>

                <h3 className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="overflow-hidden rounded-[40px] bg-indigo-600 px-8 py-16 text-white lg:px-16">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">
                Start your journey
              </p>

              <h2 className="mt-5 text-4xl font-bold leading-tight lg:text-6xl">
                Learn directly from professionals who’ve already done it.
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-indigo-100">
                Build skills faster, gain industry insights, and accelerate your
                career growth with structured mentorship.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/signup"
                  className="flex h-12 items-center justify-center rounded-2xl bg-white px-7 text-base font-semibold text-indigo-700 transition hover:bg-slate-100"
                >
                  Create Account
                </a>

                <a
                  href="/login"
                  className="flex h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
