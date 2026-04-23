import Link from "next/link";

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "AI-Powered Analysis",
    description:
      "Multi-agent AI pipeline interprets your health data with clinical precision, going beyond simple number-crunching to deliver real understanding.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
    title: "Holistic Wellness Approach",
    description:
      "Combining Ayurveda, acupressure, and energy diagnostics with modern AI for a truly comprehensive view of your physical, mental, and emotional health.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
    title: "Personalized Insights",
    description:
      "Context-aware findings tailored to your age, gender, medical history, and lifestyle — because no two health profiles are the same.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: "Non-Invasive Assessments",
    description:
      "Science-backed, non-invasive wellness evaluations based on advanced principles — identifying imbalances before symptoms appear.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "Actionable Recommendations",
    description:
      "Prioritized, timeframe-specific guidance — from essential lifestyle changes to Ayurvedic dietary suggestions and mindfulness practices.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    ),
    title: "Organizational Wellness",
    description:
      "Wellness Index programs for corporates, schools, and institutions — aggregate health insights, trend analysis, and ROI tracking.",
  },
];

const steps = [
  {
    number: "01",
    title: "Submit Your Data",
    description:
      "Enter your health parameters, clinical notes, and profile details — or upload a lab report for automatic extraction.",
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
      "Receive a comprehensive report with wellness scores, risk cards, actionable recommendations, and a downloadable PDF.",
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
              AI + Ayurveda + Energy Diagnostics
            </div>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Your Health, Understood &mdash;{" "}
              <span className="bg-gradient-to-r from-[#2563EB] to-emerald-500 bg-clip-text text-transparent">
                Not Just Measured
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Transform raw lab numbers into meaningful, personalized health
              insights. Our multi-agent AI system combines modern science with
              holistic wisdom to interpret your data, stratify risks, and deliver
              actionable recommendations.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/assess"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:shadow-blue-500/40"
              >
                Start Assessment
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-slate-400 hover:bg-slate-50"
              >
                Book Appointment
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:underline"
              >
                View Reports &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Strip */}
      <section className="border-y border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="text-center md:text-left">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563EB]">
                Our Vision
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Democratizing Health Intelligence
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Making advanced wellness assessments accessible, understandable,
                and actionable for every individual and organization &mdash; bridging
                the gap between raw medical data and genuine well-being.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Our Mission
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Science + Wisdom + Technology
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Providing non-invasive, scientifically grounded wellness
                assessments that combine AI-driven lab interpretation, Ayurvedic
                principles, and energy-based diagnostics for holistic health
                empowerment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Comprehensive Wellness Platform
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Powered by a pipeline of six specialized AI agents working together
              with holistic health frameworks.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:border-blue-200 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
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
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: "6", label: "AI Agents" },
              { value: "50+", label: "Health Parameters" },
              { value: "3", label: "Languages" },
              { value: "7", label: "Report Sections" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-[#2563EB]">{s.value}</p>
                <p className="mt-1 text-sm font-medium text-slate-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB] text-sm font-bold text-white">H</span>
                <span className="text-lg font-bold text-slate-900">HealthSync AI</span>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                AI-powered wellness assessment platform combining modern science
                with holistic health approaches.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Platform</h3>
              <ul className="mt-3 space-y-2">
                {[
                  { href: "/assess", label: "Start Assessment" },
                  { href: "/dashboard", label: "Dashboard" },
                  { href: "/book", label: "Book Appointment" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-500 hover:text-[#2563EB]">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Company</h3>
              <ul className="mt-3 space-y-2">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/services", label: "Services" },
                  { href: "/blog", label: "Knowledge Hub" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-500 hover:text-[#2563EB]">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Legal</h3>
              <ul className="mt-3 space-y-2">
                <li><span className="text-sm text-slate-500">Privacy Policy</span></li>
                <li><span className="text-sm text-slate-500">Terms of Service</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
            HealthSync AI generates reports for informational purposes only.
            Always consult a qualified healthcare provider.
          </div>
        </div>
      </footer>
    </div>
  );
}
