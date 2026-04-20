"use client";

export interface UrgencyBannerProps {
  alerts: string[];
}

export function UrgencyBanner({ alerts }: UrgencyBannerProps) {
  if (alerts.length === 0) return null;

  return (
    <div
      className="w-full border-b border-red-900/30 bg-gradient-to-r from-red-700 via-danger to-red-700 text-white shadow-md"
      role="alert"
    >
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/25">
            <svg
              className="h-6 w-6 text-amber-200"
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
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <p className="text-sm font-semibold leading-snug text-white sm:text-base">
              These findings require prompt medical attention. Please consult a
              doctor within 24-48 hours.
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-red-50/95 marker:text-amber-200">
              {alerts.map((alert, i) => (
                <li key={i} className="pl-0.5">
                  {alert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
