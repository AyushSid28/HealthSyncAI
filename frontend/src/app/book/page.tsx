"use client";

import { useState } from "react";

const SERVICE_TYPES = [
  { id: "individual", label: "Individual Assessment", description: "Comprehensive personal wellness evaluation" },
  { id: "corporate", label: "Corporate Program", description: "Organization-wide wellness assessment" },
  { id: "consultation", label: "Expert Consultation", description: "One-on-one session with a wellness specialist" },
  { id: "follow-up", label: "Follow-up Session", description: "Review previous assessment and track progress" },
];

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
];

function getNextDays(count: number): { date: Date; label: string; dayName: string }[] {
  const days: { date: Date; label: string; dayName: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= count + 5; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() === 0) continue;
    if (days.length >= count) break;
    days.push({
      date: d,
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
    });
  }
  return days;
}

export default function BookPage() {
  const [step, setStep] = useState(0);
  const [serviceType, setServiceType] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const dates = getNextDays(10);

  function canProceed(): boolean {
    if (step === 0) return serviceType !== "";
    if (step === 1) return selectedDate !== null && selectedTime !== null;
    if (step === 2) return name.trim() !== "" && email.trim() !== "";
    return true;
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <svg className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-900">Appointment Booked!</h1>
        <p className="mt-3 text-sm text-slate-600">
          Your {SERVICE_TYPES.find((s) => s.id === serviceType)?.label} has been
          scheduled for <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          A confirmation email will be sent to <strong>{email}</strong>.
        </p>
        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 text-left">
          <h3 className="text-sm font-semibold text-slate-900">Booking Details</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-slate-500">Name</dt><dd className="font-medium text-slate-900">{name}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Service</dt><dd className="font-medium text-slate-900">{SERVICE_TYPES.find((s) => s.id === serviceType)?.label}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Date</dt><dd className="font-medium text-slate-900">{selectedDate}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Time</dt><dd className="font-medium text-slate-900">{selectedTime}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Email</dt><dd className="font-medium text-slate-900">{email}</dd></div>
            {phone && <div className="flex justify-between"><dt className="text-slate-500">Phone</dt><dd className="font-medium text-slate-900">{phone}</dd></div>}
          </dl>
        </div>
        <button
          onClick={() => { setSubmitted(false); setStep(0); setServiceType(""); setSelectedDate(null); setSelectedTime(null); setName(""); setEmail(""); setPhone(""); setNotes(""); }}
          className="mt-6 text-sm font-medium text-[#2563EB] hover:underline"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Book an Appointment</h1>
        <p className="mt-1 text-sm text-slate-500">
          Schedule an in-person wellness assessment or consultation.
        </p>
      </div>

      {/* Step indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {["Service", "Date & Time", "Your Details"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                i === step
                  ? "bg-[#2563EB] text-white"
                  : i < step
                    ? "bg-blue-50 text-[#2563EB]"
                    : "bg-slate-100 text-slate-400"
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">
                {i < step ? "\u2713" : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </button>
            {i < 2 && <div className={`h-px w-8 ${i < step ? "bg-[#2563EB]" : "bg-slate-200"}`} />}
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Step 0: Service */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Select a Service</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {SERVICE_TYPES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setServiceType(s.id)}
                  className={`rounded-xl border p-5 text-left transition-colors ${
                    serviceType === s.id
                      ? "border-[#2563EB] bg-blue-50 ring-1 ring-[#2563EB]"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <p className={`text-sm font-semibold ${serviceType === s.id ? "text-[#2563EB]" : "text-slate-900"}`}>
                    {s.label}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{s.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Date & Time */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Select a Date</h2>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {dates.map((d) => (
                  <button
                    key={d.label}
                    type="button"
                    onClick={() => setSelectedDate(d.label)}
                    className={`flex shrink-0 flex-col items-center rounded-xl border px-4 py-3 transition-colors ${
                      selectedDate === d.label
                        ? "border-[#2563EB] bg-blue-50 ring-1 ring-[#2563EB]"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-xs text-slate-500">{d.dayName}</span>
                    <span className={`text-sm font-semibold ${selectedDate === d.label ? "text-[#2563EB]" : "text-slate-900"}`}>
                      {d.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Select a Time</h2>
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                      selectedTime === t
                        ? "border-[#2563EB] bg-blue-50 text-[#2563EB] ring-1 ring-[#2563EB]"
                        : "border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-slate-900">Your Details</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone (Optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Additional Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Any specific concerns or requirements..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>

            {/* Booking summary */}
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">Booking Summary</h3>
              <div className="mt-2 space-y-1 text-sm text-slate-600">
                <p>Service: <span className="font-medium text-slate-900">{SERVICE_TYPES.find((s) => s.id === serviceType)?.label}</span></p>
                <p>Date: <span className="font-medium text-slate-900">{selectedDate}</span></p>
                <p>Time: <span className="font-medium text-slate-900">{selectedTime}</span></p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          {step < 2 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="rounded-lg bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
