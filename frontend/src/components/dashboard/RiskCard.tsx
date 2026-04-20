"use client";

import type { RiskCard as RiskCardType } from "@/types";

type Severity = "low" | "moderate" | "high" | "critical";
type Color = "green" | "amber" | "red" | "dark_red";

const BORDER_BY_COLOR: Record<Color, string> = {
  green: "border-l-green-500",
  amber: "border-l-amber-500",
  red: "border-l-red-500",
  dark_red: "border-l-red-900",
};

const SEVERITY_BADGE: Record<Severity, string> = {
  low: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  moderate: "bg-amber-50 text-amber-900 ring-amber-200",
  high: "bg-red-50 text-red-800 ring-red-200",
  critical: "bg-red-950 text-red-100 ring-red-900",
};

function normalizeSeverity(card: Record<string, unknown>): Severity {
  const raw = (card.severity ?? card.risk_level ?? "low") as string;
  const lower = raw.toLowerCase();
  if (lower === "high") return "high";
  if (lower === "moderate" || lower === "medium") return "moderate";
  if (lower === "critical") return "critical";
  return "low";
}

function normalizeColor(card: Record<string, unknown>, severity: Severity): Color {
  const raw = card.color as string | undefined;
  if (raw && raw in BORDER_BY_COLOR) return raw as Color;
  const map: Record<Severity, Color> = { low: "green", moderate: "amber", high: "red", critical: "dark_red" };
  return map[severity];
}

export interface RiskCardProps {
  card: RiskCardType;
}

export function RiskCard({ card }: RiskCardProps) {
  const raw = card as unknown as Record<string, unknown>;
  const severity = normalizeSeverity(raw);
  const color = normalizeColor(raw, severity);
  const indicator = (raw.indicator ?? raw.parameter_name ?? "Unknown") as string;
  const value = String(raw.value ?? "");
  const thresholdRange = (raw.threshold_range ?? raw.reference_range ?? "") as string;
  const explanation = (raw.explanation ?? "") as string;
  const urgency = Boolean(raw.urgency_flag);

  const border = BORDER_BY_COLOR[color];
  const badge = SEVERITY_BADGE[severity];
  const label = severity.charAt(0).toUpperCase() + severity.slice(1);

  return (
    <article
      className={`rounded-xl border border-slate-200/90 bg-white shadow-sm shadow-slate-200/40 border-l-4 ${border} overflow-hidden transition-shadow hover:shadow-md`}
    >
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-slate-900">{indicator}</h3>
            <p className="mt-1 text-lg font-semibold tabular-nums text-primary">
              {value}
            </p>
          </div>
          <span
            className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${badge}`}
          >
            {label}
          </span>
        </div>
        {thresholdRange && (
          <p className="mt-1 text-xs text-slate-500">
            Reference:{" "}
            <span className="font-medium text-slate-600">{thresholdRange}</span>
          </p>
        )}
        {explanation && (
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {explanation}
          </p>
        )}
        {urgency && (
          <div
            className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-900"
            role="alert"
          >
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-danger"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">
              <span className="font-semibold">Requires immediate attention.</span>{" "}
              Follow up with your clinician promptly.
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
