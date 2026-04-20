"use client";

import type { RiskCard as RiskCardType } from "@/types";
import { RiskCard } from "./RiskCard";

export interface RiskCardGridProps {
  cards: RiskCardType[];
}

export function RiskCardGrid({ cards }: RiskCardGridProps) {
  if (cards.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-10 text-center">
        <h2 className="text-lg font-semibold text-slate-800">Risk Indicators</h2>
        <p className="mt-2 text-sm text-slate-500">
          No risk indicators recorded for this assessment.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Risk Indicators
        </h2>
        <p className="text-sm text-slate-500">
          {cards.length} indicator{cards.length === 1 ? "" : "s"} reviewed
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <RiskCard
            key={`${(card as any).indicator ?? (card as any).parameter_name ?? index}-${index}`}
            card={card}
          />
        ))}
      </div>
    </section>
  );
}
