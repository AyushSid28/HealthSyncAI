"use client";

import { useMemo } from "react";

type ScoreBand = "low" | "mid" | "high";

function scoreBand(score: number): ScoreBand {
  const s = Math.min(100, Math.max(0, score));
  if (s <= 40) return "low";
  if (s <= 65) return "mid";
  return "high";
}

const BAND_STROKE: Record<ScoreBand, string> = {
  low: "#DC2626",
  mid: "#F59E0B",
  high: "#16A34A",
};

const BAND_GLOW: Record<ScoreBand, string> = {
  low: "rgba(220, 38, 38, 0.2)",
  mid: "rgba(245, 158, 11, 0.2)",
  high: "rgba(22, 163, 74, 0.2)",
};

export interface WellnessScoreCardProps {
  score: number;
}

export function WellnessScoreCard({ score }: WellnessScoreCardProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(score)));
  const band = scoreBand(clamped);

  const { circumference, offset } = useMemo(() => {
    const r = 88;
    const c = 2 * Math.PI * r;
    const pct = clamped / 100;
    return { circumference: c, offset: c * (1 - pct) };
  }, [clamped]);

  const stroke = BAND_STROKE[band];
  const glow = BAND_GLOW[band];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-slate-200/60">
      <div className="flex flex-col items-center">
        <div
          className="relative flex h-56 w-56 items-center justify-center"
          role="img"
          aria-label={`Wellness score ${clamped} out of 100`}
        >
          <div
            className="absolute inset-4 rounded-full blur-xl"
            style={{ background: glow }}
            aria-hidden
          />
          <svg
            className="h-full w-full -rotate-90 transform"
            viewBox="0 0 200 200"
            aria-hidden
          >
            <circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="12"
            />
            <circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke={stroke}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-[stroke-dashoffset] duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-5xl font-bold tracking-tight text-slate-900 tabular-nums"
              style={{ color: stroke }}
            >
              {clamped}
            </span>
            <span className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
              / 100
            </span>
          </div>
        </div>
        <p className="mt-6 text-center text-sm font-semibold uppercase tracking-wide text-slate-600">
          Wellness Score
        </p>
      </div>
    </div>
  );
}
