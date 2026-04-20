import Link from "next/link";

const features = [
  {
    icon: "🧠",
    title: "AI-Powered Analysis",
    description:
      "Multi-agent AI pipeline interprets your health data with clinical precision, going beyond simple number-crunching to deliver real understanding.",
  },
  {
    icon: "🎯",
    title: "Personalized Insights",
    description:
      "Context-aware findings tailored to your age, gender, medical history, and lifestyle — because no two health profiles are the same.",
  },
  {
    icon: "💡",
    title: "Actionable Recommendations",
    description:
      "Prioritized, timeframe-specific guidance you can actually follow, from essential lifestyle changes to optional wellness boosts.",
  },
];

const steps = [
  {
    number: "01",
    title: "Submit Your Data",
    description:
      "Enter your health parameters, clinical notes, and profile details through our guided assessment form.",
  },
  {
    number: "02",
    title: "AI Analysis",
    description:
      "Our multi-agent pipeline parses, interprets, stratifies risks, and validates results through six specialized AI agents.",
  },
  {
    number: "03",
    title: "Get Your Report",
    description:
      "Receive a comprehensive, beautifully formatted report with wellness scores, risk cards, and downloadable PDF.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-emerald-50" />
        <div className="absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#2563EB]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
              AI-Powered Health Intelligence
            </div>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Your Health, Understood —{" "}
              <span className="bg-gradient-to-r from-[#2563EB] to-emerald-500 bg-clip-text text-transparent">
                Not Just Measured
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Transform raw lab numbers into meaningful, personalized health
              insights. Our multi-agent AI system interprets your data,
              stratifies risks, and delivers actionable recommendations — all in
              a beautiful, easy-to-understand report.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/assess"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:shadow-blue-500/40"
              >
                Start Assessment
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-slate-400 hover:bg-slate-50"
              >
                View Reports
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-100 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Intelligent Health Analysis
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Powered by a pipeline of six specialized AI agents that work
              together to deliver comprehensive health insights.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:border-blue-200 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#2563EB]">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              From raw data to actionable insights in three simple steps.
            </p>
          </div>

          <div className="relative mt-16 grid gap-8 lg:grid-cols-3">
            <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent lg:block" />
            {steps.map((s) => (
              <div key={s.number} className="relative text-center">
                <div className="relative z-10 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-blue-700 text-lg font-bold text-white shadow-lg shadow-blue-500/25">
                  {s.number}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/assess"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700"
            >
              Get Started Now
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          <p>
            HealthSync AI generates reports for informational purposes only.
            Always consult a qualified healthcare provider.
          </p>
        </div>
      </footer>
    </div>
  );
}
