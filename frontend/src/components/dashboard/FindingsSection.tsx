"use client";

import { useMemo } from "react";
import type { InterpretedFinding } from "@/types";

export interface FindingsSectionProps {
  findings: InterpretedFinding[];
}

function groupByCategory(items: InterpretedFinding[]) {
  const map = new Map<string, InterpretedFinding[]>();
  for (const f of items) {
    const key = f.category?.trim() || "General";
    const list = map.get(key) ?? [];
    list.push(f);
    map.set(key, list);
  }
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
}

export function FindingsSection({ findings }: FindingsSectionProps) {
  const grouped = useMemo(() => groupByCategory(findings), [findings]);

  if (findings.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-10 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Interpreted findings
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          No findings to display yet.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Interpreted findings
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Clinical parameters explained in plain language, grouped by category.
        </p>
      </div>

      <div className="space-y-10">
        {grouped.map(([category, list]) => (
          <div key={category}>
            <h3 className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-primary">
              <span className="h-px w-10 shrink-0 bg-primary/30" aria-hidden />
              {category}
              <span className="h-px flex-1 bg-primary/20" aria-hidden />
            </h3>
            <ul className="space-y-4">
              {list.map((finding, idx) => (
                <li key={`${finding.parameter_name}-${idx}`}>
                  <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm shadow-slate-200/40 transition-shadow hover:shadow-md">
                    <div className="flex flex-wrap items-center gap-2 gap-y-2">
                      <h4 className="text-base font-semibold text-slate-900">
                        {finding.parameter_name}
                      </h4>
                      <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/20">
                        {finding.clinical_value}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">
                      {finding.interpretation}
                    </p>
                    <p className="mt-3 border-t border-slate-100 pt-3 text-sm italic text-slate-500">
                      {finding.context}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
