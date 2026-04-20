"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getReport, getReportPdfUrl, sendReportSMS, sendReportEmail } from "@/lib/api";
import type { FullReport } from "@/types";

import { UrgencyBanner } from "@/components/dashboard/UrgencyBanner";
import { WellnessScoreCard } from "@/components/dashboard/WellnessScoreCard";
import { RadarChart } from "@/components/dashboard/RadarChart";
import { RiskCardGrid } from "@/components/dashboard/RiskCardGrid";
import { FindingsSection } from "@/components/dashboard/FindingsSection";
import { RecommendationsList } from "@/components/dashboard/RecommendationsList";

function ReportSectionCard({
  title,
  content,
}: {
  title: string;
  content: unknown;
}) {
  function renderContent() {
    if (typeof content === "string") {
      return (
        <p className="text-sm leading-relaxed text-slate-600">{content}</p>
      );
    }

    if (Array.isArray(content)) {
      return (
        <ul className="space-y-2">
          {content.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
              {String(item)}
            </li>
          ))}
        </ul>
      );
    }

    if (content && typeof content === "object") {
      const entries = Object.entries(content as Record<string, unknown>);
      return (
        <dl className="space-y-2.5">
          {entries.map(([key, val]) => (
            <div key={key} className="flex flex-col sm:flex-row sm:gap-2">
              <dt className="text-sm font-medium text-slate-700 sm:w-40 sm:shrink-0">
                {key}
              </dt>
              <dd className="text-sm text-slate-600">
                {val == null || val === "N/A" || val === "" ? (
                  <span className="text-slate-400">Not provided</span>
                ) : (
                  String(val)
                )}
              </dd>
            </div>
          ))}
        </dl>
      );
    }

    return (
      <p className="text-sm text-slate-400">No data available</p>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#2563EB]">
        {title}
      </h3>
      {renderContent()}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 rounded-lg bg-slate-200" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-40 rounded-2xl bg-slate-200" />
          <div className="h-40 rounded-2xl bg-slate-200" />
        </div>
        <div className="h-64 rounded-2xl bg-slate-200" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-36 rounded-xl bg-slate-200" />
          ))}
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-slate-200" />
          ))}
        </div>
      </div>
    </div>
  );
}

function SharePanel({ reportId }: { reportId: string }) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [smsStatus, setSmsStatus] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function handleSMS() {
    if (!phone.trim()) return;
    setSending(true);
    setSmsStatus(null);
    try {
      await sendReportSMS(reportId, phone.trim(), lang);
      setSmsStatus("SMS sent successfully!");
    } catch (e) {
      setSmsStatus(e instanceof Error ? e.message : "SMS failed");
    }
    setSending(false);
  }

  async function handleEmail() {
    if (!email.trim()) return;
    setSending(true);
    setEmailStatus(null);
    try {
      await sendReportEmail(reportId, email.trim(), lang);
      setEmailStatus("Email sent successfully!");
    } catch (e) {
      setEmailStatus(e instanceof Error ? e.message : "Email failed");
    }
    setSending(false);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#2563EB]">
          Share Report
        </h3>
        <div className="flex rounded-lg border border-slate-200 p-0.5">
          <button
            onClick={() => setLang("en")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              lang === "en"
                ? "bg-[#2563EB] text-white"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang("hi")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              lang === "hi"
                ? "bg-[#2563EB] text-white"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Hindi
          </button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-600">Send via SMS</label>
          <div className="flex gap-2">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            />
            <button
              onClick={handleSMS}
              disabled={sending || !phone.trim()}
              className="shrink-0 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-40"
            >
              Send
            </button>
          </div>
          {smsStatus && (
            <p className={`text-xs ${smsStatus.includes("success") ? "text-green-600" : "text-red-500"}`}>
              {smsStatus}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-600">Send via Email</label>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="patient@email.com"
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            />
            <button
              onClick={handleEmail}
              disabled={sending || !email.trim()}
              className="shrink-0 rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-40"
            >
              Send
            </button>
          </div>
          {emailStatus && (
            <p className={`text-xs ${emailStatus.includes("success") ? "text-green-600" : "text-red-500"}`}>
              {emailStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReportDetailPage() {
  const { reportId } = useParams<{ reportId: string }>();
  const [report, setReport] = useState<FullReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId) return;
    getReport(reportId)
      .then(setReport)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [reportId]);

  if (loading) return <LoadingSkeleton />;

  if (error || !report) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-lg font-semibold text-red-700">
            {error || "Report not found"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-sm font-medium text-[#2563EB] hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Urgency banner (full-bleed) */}
      {report.urgency_alerts.length > 0 && (
        <div className="-mx-4 -mt-12 mb-8 sm:-mx-6 lg:-mx-8">
          <UrgencyBanner alerts={report.urgency_alerts} />
        </div>
      )}

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Health Report</h1>
          <p className="mt-1 text-sm text-slate-500">
            Generated on{" "}
            {new Date(report.generated_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href={getReportPdfUrl(report.report_id)}
            download
            className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            PDF (English)
          </a>
          <a
            href={`${getReportPdfUrl(report.report_id)}?lang=hi`}
            download
            className="inline-flex items-center gap-2 rounded-xl border border-[#2563EB] px-5 py-2.5 text-sm font-semibold text-[#2563EB] hover:bg-blue-50"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            PDF (Hindi)
          </a>
        </div>
      </div>

      <div className="space-y-8">
        {/* Share Panel */}
        <SharePanel reportId={report.report_id} />

        {/* Wellness Score + Radar */}
        <div className="grid gap-6 lg:grid-cols-2">
          <WellnessScoreCard score={report.wellness_score.composite_score} />
          <RadarChart dimensions={report.wellness_score.dimensions} />
        </div>

        {/* Report sections */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ReportSectionCard
            title={report.profile_summary.title}
            content={report.profile_summary.content}
          />
          <ReportSectionCard
            title={report.key_observations.title}
            content={report.key_observations.content}
          />
        </div>

        {/* Risk Cards */}
        <RiskCardGrid cards={report.risk_indicators} />

        {/* Interpreted Findings */}
        <FindingsSection findings={report.interpreted_findings} />

        {/* Wellness Insights */}
        <ReportSectionCard
          title={report.wellness_insights.title}
          content={report.wellness_insights.content}
        />

        {/* Recommendations */}
        <RecommendationsList
          recommendations={report.personalized_recommendations}
        />

        {/* Preventive Lifestyle */}
        <ReportSectionCard
          title={report.preventive_lifestyle.title}
          content={report.preventive_lifestyle.content}
        />

        {/* Disclaimer */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs leading-relaxed text-slate-500">
            <span className="font-semibold">Disclaimer:</span>{" "}
            {report.disclaimer}
          </p>
          {report.qa_notes.length > 0 && (
            <div className="mt-3 border-t border-slate-200 pt-3">
              <p className="text-xs font-semibold text-slate-500">QA Notes:</p>
              <ul className="mt-1 space-y-0.5">
                {report.qa_notes.map((note, i) => (
                  <li key={i} className="text-xs text-slate-400">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
