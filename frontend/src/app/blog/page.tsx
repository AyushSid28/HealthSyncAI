"use client";

import { useState } from "react";

const categories = ["All", "Nutrition", "Mindfulness", "Ayurveda", "Fitness", "Mental Health"];

const articles = [
  {
    slug: "understanding-your-lab-report",
    category: "Nutrition",
    title: "Understanding Your Lab Report: A Complete Guide",
    excerpt:
      "Lab reports are full of numbers that can be overwhelming. Learn what CBC, lipid panels, thyroid function, and metabolic markers really mean — and when to worry.",
    readTime: "8 min read",
    date: "Mar 25, 2026",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "ayurveda-meets-ai",
    category: "Ayurveda",
    title: "When Ayurveda Meets AI: The Future of Holistic Health",
    excerpt:
      "Discover how we combine 5,000 years of Ayurvedic wisdom with cutting-edge AI to deliver Prakriti-aware health insights that go beyond Western medicine alone.",
    readTime: "6 min read",
    date: "Mar 20, 2026",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "stress-hidden-health-impact",
    category: "Mental Health",
    title: "The Hidden Health Impact of Chronic Stress",
    excerpt:
      "Chronic stress doesn\u2019t just affect your mood \u2014 it elevates cortisol, raises blood pressure, disrupts sleep, and can lead to metabolic syndrome. Here\u2019s what to watch for.",
    readTime: "5 min read",
    date: "Mar 15, 2026",
    featured: false,
  },
  {
    slug: "acupressure-beginners-guide",
    category: "Ayurveda",
    title: "Acupressure for Beginners: 5 Points That Matter",
    excerpt:
      "Energy meridians run throughout your body. Learn about five key acupressure points that can help with headaches, digestion, stress, and overall vitality.",
    readTime: "4 min read",
    date: "Mar 10, 2026",
    featured: false,
  },
  {
    slug: "mindfulness-techniques-daily-life",
    category: "Mindfulness",
    title: "5 Mindfulness Techniques You Can Use Daily",
    excerpt:
      "From box breathing to body scans, these evidence-based mindfulness practices take just 5 minutes and can dramatically improve your emotional resilience.",
    readTime: "4 min read",
    date: "Mar 5, 2026",
    featured: false,
  },
  {
    slug: "corporate-wellness-roi",
    category: "Fitness",
    title: "Corporate Wellness Programs: Measuring Real ROI",
    excerpt:
      "Organizations investing in employee wellness see up to 6:1 ROI through reduced absenteeism, higher productivity, and lower healthcare costs. Here\u2019s the data.",
    readTime: "7 min read",
    date: "Feb 28, 2026",
    featured: false,
  },
  {
    slug: "vitamin-d-deficiency-india",
    category: "Nutrition",
    title: "Why 70% of Indians Are Vitamin D Deficient",
    excerpt:
      "Despite abundant sunshine, Vitamin D deficiency is epidemic in India. Understand the causes, symptoms, optimal levels, and dietary sources to fix it.",
    readTime: "5 min read",
    date: "Feb 20, 2026",
    featured: false,
  },
  {
    slug: "sleep-hygiene-complete-guide",
    category: "Mental Health",
    title: "Sleep Hygiene: The Most Underrated Health Intervention",
    excerpt:
      "Quality sleep affects everything from HbA1c levels to cognitive function. Learn the science of sleep hygiene and how to build a routine that sticks.",
    readTime: "6 min read",
    date: "Feb 15, 2026",
    featured: false,
  },
];

const categoryColorMap: Record<string, { bg: string; text: string }> = {
  Nutrition: { bg: "bg-emerald-50", text: "text-emerald-700" },
  Mindfulness: { bg: "bg-purple-50", text: "text-purple-700" },
  Ayurveda: { bg: "bg-amber-50", text: "text-amber-700" },
  Fitness: { bg: "bg-blue-50", text: "text-[#2563EB]" },
  "Mental Health": { bg: "bg-rose-50", text: "text-rose-700" },
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const featured = filtered.filter((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Knowledge Hub
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Expert insights on wellness, nutrition, Ayurveda, and preventive
              health &mdash; backed by science and AI.
            </p>
          </div>

          {/* Category pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "border-[#2563EB] bg-[#2563EB] text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featured.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-slate-900">Featured</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {featured.map((article) => {
                const c = categoryColorMap[article.category] || { bg: "bg-slate-50", text: "text-slate-700" };
                return (
                  <article
                    key={article.slug}
                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-slate-100 to-slate-50">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : null}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3">
                        <span className={`rounded-full ${c.bg} px-2.5 py-0.5 text-xs font-semibold ${c.text}`}>
                          {article.category}
                        </span>
                        <span className="text-xs text-slate-400">{article.date}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold text-slate-900 group-hover:text-[#2563EB]">
                        {article.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                        {article.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-slate-400">{article.readTime}</span>
                        <span className="text-sm font-medium text-[#2563EB] group-hover:underline">
                          Read more &rarr;
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="border-t border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">
            {activeCategory === "All" ? "All Articles" : activeCategory}
            <span className="ml-2 text-base font-normal text-slate-400">
              ({rest.length} article{rest.length !== 1 ? "s" : ""})
            </span>
          </h2>

          {rest.length === 0 && featured.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <p className="text-sm text-slate-500">No articles in this category yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => {
                const c = categoryColorMap[article.category] || { bg: "bg-slate-50", text: "text-slate-700" };
                return (
                  <article
                    key={article.slug}
                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full ${c.bg} px-2.5 py-0.5 text-xs font-semibold ${c.text}`}>
                        {article.category}
                      </span>
                      <span className="text-xs text-slate-400">{article.date}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-[#2563EB]">
                      {article.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-xs text-slate-400">{article.readTime}</span>
                      <span className="text-sm font-medium text-[#2563EB] group-hover:underline">
                        Read &rarr;
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-[#2563EB] to-blue-700 p-10 text-center lg:p-16">
            <h2 className="text-3xl font-bold text-white">Stay Updated</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-blue-100/80">
              Get weekly wellness insights, Ayurvedic tips, and health guides
              delivered straight to your inbox.
            </p>
            <div className="mx-auto mt-8 flex max-w-md gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border-0 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#2563EB] hover:bg-blue-50">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
