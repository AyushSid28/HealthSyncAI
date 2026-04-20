"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listReports } from "@/lib/api";
import type { ReportSummary } from "@/types";

export default function DashboardPage() {
  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listReports()
      .then((data) => setReports(data.reports))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900">Your Reports</h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="h-6 w-20 rounded bg-slate-200" />
              <div className="mt-4 h-12 w-16 rounded bg-slate-200" />
              <div className="mt-4 h-4 w-32 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900">Your Reports</h1>
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm text-red-600">
            Failed to load reports: {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-sm font-medium text-[#2563EB] hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Your Reports</h1>
          <p className="mt-1 text-sm text-slate-500">
            {reports.length} report{reports.length !== 1 ? "s" : ""} generated
          </p>
        </div>
        <Link
          href="/assess"
          className="rounded-xl bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          New Assessment
        </Link>
      </div>

      {reports.length === 0 ? (
        <div className="mt-16 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl">
            📋
          </div>
          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            No reports yet
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Start your first health assessment to see your results here.
          </p>
          <Link
            href="/assess"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Start Assessment
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <Link
              key={report.report_id}
              href={`/dashboard/${report.report_id}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-[#2563EB]">
                  {report.language.toUpperCase()}
                </span>
                <svg
                  className="h-5 w-5 text-slate-400 group-hover:text-[#2563EB]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>

              <div className="mt-4">
                <p className="text-sm text-slate-500">Wellness Score</p>
                <p className="text-3xl font-bold text-slate-900">
                  {report.wellness_score ?? "—"}
                  {report.wellness_score != null && (
                    <span className="text-base font-normal text-slate-400">
                      /100
                    </span>
                  )}
                </p>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                {report.generated_at
                  ? new Date(report.generated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Date unknown"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
