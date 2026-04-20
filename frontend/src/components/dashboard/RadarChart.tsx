"use client";

import type { ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const AXIS_LABELS = [
  "Physical",
  "Metabolic",
  "Cardiovascular",
  "Mental",
  "Nutritional",
  "Lifestyle",
] as const;

function resolveDimensionValue(
  dimensions: Record<string, number>,
  axis: string
): number {
  const normalized = axis.toLowerCase();
  const entry = Object.entries(dimensions).find(
    ([k]) => k.toLowerCase() === normalized
  );
  const raw =
    dimensions[axis] ??
    dimensions[axis.toLowerCase()] ??
    (entry ? entry[1] : 0);
  return Math.min(100, Math.max(0, Number(raw) || 0));
}

export interface RadarChartProps {
  dimensions: Record<string, number>;
}

export function RadarChart({ dimensions }: RadarChartProps) {
  const dataValues = AXIS_LABELS.map((label) =>
    resolveDimensionValue(dimensions, label)
  );

  const data = {
    labels: [...AXIS_LABELS],
    datasets: [
      {
        label: "Wellness dimensions",
        data: dataValues,
        backgroundColor: "rgba(37, 99, 235, 0.22)",
        borderColor: "#2563EB",
        borderWidth: 2,
        pointBackgroundColor: "#2563EB",
        pointBorderColor: "#ffffff",
        pointHoverBackgroundColor: "#1D4ED8",
        pointHoverBorderColor: "#ffffff",
        pointRadius: 4,
        pointHoverRadius: 5,
      },
    ],
  };

  const options: ChartOptions<"radar"> = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          showLabelBackdrop: false,
          color: "#64748B",
          font: { size: 10 },
        },
        grid: {
          color: "rgba(148, 163, 184, 0.35)",
        },
        angleLines: {
          color: "rgba(148, 163, 184, 0.45)",
        },
        pointLabels: {
          color: "#334155",
          font: { size: 11, weight: "bold" },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#0F172A",
        titleColor: "#F8FAFC",
        bodyColor: "#E2E8F0",
        borderColor: "#334155",
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label(ctx) {
            const v = ctx.parsed.r;
            return `${ctx.dataset.label ?? "Score"}: ${v}`;
          },
        },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-md shadow-slate-200/50 sm:p-6">
      <h3 className="mb-4 text-center text-sm font-semibold text-slate-800">
        Dimension profile
      </h3>
      <div className="mx-auto max-w-md">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}
