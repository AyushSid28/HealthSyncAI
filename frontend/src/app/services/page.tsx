import Link from "next/link";

const individualServices = [
  {
    title: "Comprehensive Wellness Assessment",
    description:
      "A full-spectrum health analysis covering physical, mental, and emotional wellness through AI-interpreted lab reports, Ayurvedic Prakriti profiling, and energy diagnostics.",
    features: [
      "50+ health parameter analysis",
      "AI-powered risk stratification",
      "Personalized wellness score (0-100)",
      "Downloadable PDF report",
    ],
    color: "blue" as const,
  },
  {
    title: "Nutritional & Lifestyle Guidance",
    description:
      "Receive actionable, prioritized recommendations for diet, exercise, sleep, and mindfulness tailored to your unique health profile and risk factors.",
    features: [
      "Dosha-based dietary suggestions",
      "Exercise & yoga routines",
      "Sleep hygiene protocols",
      "Stress management techniques",
    ],
    color: "emerald" as const,
  },
  {
    title: "Acupressure & Energy Mapping",
    description:
      "Non-invasive biofield analysis identifies subtle energy imbalances through acupressure point assessment, offering early detection insights before clinical symptoms manifest.",
    features: [
      "Meridian energy flow assessment",
      "Acupressure point mapping",
      "Chakra alignment analysis",
      "Preventive wellness insights",
    ],
    color: "purple" as const,
  },
  {
    title: "Mental & Emotional Wellness",
    description:
      "Dedicated assessment modules for stress, anxiety, cognitive wellness, and emotional resilience — powered by validated psychometric frameworks and AI interpretation.",
    features: [
      "Stress & anxiety indicators",
      "Cognitive wellness tracking",
      "Emotional resilience scoring",
      "Mindfulness recommendations",
    ],
    color: "amber" as const,
  },
];

const orgServices = [
  {
    title: "Corporate Wellness Index",
    description:
      "Aggregate wellness scoring for your entire workforce. Identify department-level health trends, absenteeism risk factors, and ROI on wellness programs.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
  {
    title: "University & School Programs",
    description:
      "Student and faculty wellness assessments with institutional dashboards, trend analysis, and actionable recommendations for campus wellness initiatives.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Industrial Health Monitoring",
    description:
      "Occupational health tracking for manufacturing, logistics, and industrial environments — with risk-specific assessments for workplace hazards and ergonomic factors.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
  {
    title: "Custom Wellness Programs",
    description:
      "Tailored wellness assessment programs designed for your organization's specific needs — from executive health checks to department-wide wellness drives.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.431.992a7.723 7.723 0 0 1 0 .255c-.007.378.138.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
];

const colorMap = {
  blue: { border: "border-blue-100", bg: "bg-blue-50", text: "text-[#2563EB]", dot: "bg-[#2563EB]" },
  emerald: { border: "border-emerald-100", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-600" },
  purple: { border: "border-purple-100", bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-600" },
  amber: { border: "border-amber-100", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-600" },
};

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#2563EB]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
              What We Offer
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Our Services
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              From individual wellness assessments to organization-wide health
              programs — we provide scientifically grounded, AI-powered services
              for comprehensive well-being.
            </p>
          </div>
        </div>
      </section>

      {/* Individual Services */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Individual Wellness Services
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Personalized assessments designed for your unique health journey.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {individualServices.map((service) => {
              const c = colorMap[service.color];
              return (
                <div
                  key={service.title}
                  className={`rounded-2xl border ${c.border} bg-white p-8 shadow-sm transition-shadow hover:shadow-md`}
                >
                  <div className={`mb-2 inline-flex rounded-full ${c.bg} px-3 py-1 text-xs font-semibold ${c.text}`}>
                    {service.title}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Organizational Services */}
      <section className="border-t border-slate-100 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Organizational Wellness Index
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Evaluate and improve the well-being ecosystem of your institution —
              schools, universities, corporates, and industries.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {orgServices.map((service) => (
              <div
                key={service.title}
                className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Index Explained */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 p-10 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  What is the Wellness Index?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-blue-100/80">
                  The Wellness Index is a composite score (0-100) that quantifies
                  the overall well-being of an organization. It aggregates
                  individual wellness scores across departments, identifies
                  systemic health trends, and provides data-driven recommendations
                  for institutional wellness improvement.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-6">
                  {[
                    { value: "Physical", desc: "Fitness & vitals" },
                    { value: "Mental", desc: "Stress & cognition" },
                    { value: "Emotional", desc: "Resilience & balance" },
                  ].map((d) => (
                    <div key={d.value}>
                      <p className="text-lg font-bold text-emerald-400">{d.value}</p>
                      <p className="text-xs text-blue-200/60">{d.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Department Reports", icon: "chart" },
                  { label: "Trend Analysis", icon: "trend" },
                  { label: "Absenteeism Risk", icon: "alert" },
                  { label: "ROI Tracking", icon: "money" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm">
                    <p className="text-sm font-medium text-white">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-100 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            Whether you are an individual or an organization, we have a wellness
            solution for you.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/assess"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700"
            >
              Individual Assessment
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
