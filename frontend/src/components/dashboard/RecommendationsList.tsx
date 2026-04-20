"use client";

import type { Recommendation } from "@/types";

const PRIORITY_ACCENT: Record<Recommendation["priority"], string> = {
  essential: "border-l-red-600",
  recommended: "border-l-amber-500",
  optional: "border-l-green-600",
};

const PRIORITY_DOT: Record<Recommendation["priority"], string> = {
  essential: "bg-red-600",
  recommended: "bg-amber-500",
  optional: "bg-green-600",
};

const PRIORITY_LABEL: Record<Recommendation["priority"], string> = {
  essential: "Essential",
  recommended: "Recommended",
  optional: "Optional",
};

export interface RecommendationsListProps {
  recommendations: Recommendation[];
}

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  if (recommendations.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-10 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Personalized recommendations
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          No recommendations for this report.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Personalized recommendations
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Prioritized actions to discuss with your care team.
        </p>
      </div>
      <ul className="space-y-4">
        {recommendations.map((rec, index) => (
          <li key={`${rec.title}-${index}`}>
            <article
              className={`rounded-xl border border-slate-200/90 bg-white shadow-sm shadow-slate-200/40 border-l-4 ${PRIORITY_ACCENT[rec.priority] ?? "border-l-slate-300"} overflow-hidden transition-shadow hover:shadow-md`}
            >
              <div className="p-5">
                <div className="flex flex-wrap items-start gap-3">
                  <div
                    className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${PRIORITY_DOT[rec.priority] ?? "bg-slate-400"}`}
                    title={PRIORITY_LABEL[rec.priority] ?? rec.priority}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        {rec.title}
                      </h3>
                      <span className="inline-flex rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200/80">
                        {rec.category}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {rec.description}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-slate-100 pt-3 text-xs text-slate-500">
                      <span>
                        <span className="font-medium text-slate-600">
                          Timeframe:{" "}
                        </span>
                        {rec.timeframe}
                      </span>
                      <span>
                        <span className="font-medium text-slate-600">
                          Related risk:{" "}
                        </span>
                        {rec.related_risk}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
