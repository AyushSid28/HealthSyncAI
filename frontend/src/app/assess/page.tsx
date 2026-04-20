"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitAssessmentSync, submitDocumentUpload } from "@/lib/api";
import type { AssessmentRequest, QuantitativeParams } from "@/types";

const LANGUAGES = [
  { code: "en" as const, label: "English" },
];

const STEP_LABELS = ["Profile", "Clinical Notes", "Health Parameters"];

interface TagInputProps {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

function TagInput({ label, tags, onChange, placeholder }: TagInputProps) {
  const [input, setInput] = useState("");

  function addTag() {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput("");
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder={placeholder}
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
        />
        <button
          type="button"
          onClick={addTag}
          className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200"
        >
          Add
        </button>
      </div>
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-[#2563EB]"
            >
              {tag}
              <button
                type="button"
                onClick={() => onChange(tags.filter((t) => t !== tag))}
                className="ml-0.5 text-blue-400 hover:text-blue-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

const PARAM_GROUPS = [
  {
    heading: "Blood Pressure",
    fields: [
      { key: "blood_pressure_systolic", label: "Systolic (mmHg)", placeholder: "120" },
      { key: "blood_pressure_diastolic", label: "Diastolic (mmHg)", placeholder: "80" },
    ],
  },
  {
    heading: "Blood Sugar",
    fields: [
      { key: "blood_glucose_fasting", label: "Fasting Glucose (mg/dL)", placeholder: "90" },
      { key: "blood_glucose_pp", label: "Post-Prandial (mg/dL)", placeholder: "140" },
      { key: "hba1c", label: "HbA1c (%)", placeholder: "5.5" },
    ],
  },
  {
    heading: "Cholesterol",
    fields: [
      { key: "total_cholesterol", label: "Total (mg/dL)", placeholder: "200" },
      { key: "hdl_cholesterol", label: "HDL (mg/dL)", placeholder: "50" },
      { key: "ldl_cholesterol", label: "LDL (mg/dL)", placeholder: "100" },
      { key: "triglycerides", label: "Triglycerides (mg/dL)", placeholder: "150" },
    ],
  },
  {
    heading: "Other Parameters",
    fields: [
      { key: "bmi", label: "BMI (kg/m²)", placeholder: "24" },
      { key: "hemoglobin", label: "Hemoglobin (g/dL)", placeholder: "14" },
      { key: "creatinine", label: "Creatinine (mg/dL)", placeholder: "1.0" },
      { key: "tsh", label: "TSH (mIU/L)", placeholder: "2.5" },
      { key: "vitamin_d", label: "Vitamin D (ng/mL)", placeholder: "30" },
      { key: "vitamin_b12", label: "Vitamin B12 (pg/mL)", placeholder: "400" },
    ],
  },
] as const;

export default function AssessPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [medicalHistory, setMedicalHistory] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);

  const [clinicalNotes, setClinicalNotes] = useState("");
  const [language, setLanguage] = useState<"en" | "hi" | "mr">("en");

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadMode, setUploadMode] = useState(false);

  const [params, setParams] = useState<Record<string, string>>({});

  function updateParam(key: string, value: string) {
    setParams((prev) => ({ ...prev, [key]: value }));
  }

  function canProceed(): boolean {
    if (step === 0) return name.trim() !== "" && age.trim() !== "";
    if (step === 1 && uploadMode) return uploadedFile !== null;
    return true;
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);

    const profileData = {
      name: name.trim() || "Patient",
      age: parseInt(age, 10) || 30,
      gender,
      medical_history: medicalHistory,
      current_medications: medications,
      allergies,
    };

    try {
      let response;

      if (uploadMode && uploadedFile) {
        response = await submitDocumentUpload(uploadedFile, profileData, language);
      } else {
        const quantitative: QuantitativeParams = {};
        for (const [key, val] of Object.entries(params)) {
          if (val.trim() !== "") {
            (quantitative as Record<string, number>)[key] = parseFloat(val);
          }
        }

        const payload: AssessmentRequest = {
          profile: profileData,
          clinical_notes:
            clinicalNotes.trim() !== ""
              ? { raw_text: clinicalNotes, source: "manual" }
              : null,
          parameters: Object.keys(quantitative).length > 0 ? quantitative : null,
          language,
        };
        response = await submitAssessmentSync(payload);
      }

      router.push(`/dashboard/${response.report_id}`);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Submission failed");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Health Assessment
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Fill in your health data to generate a personalized AI report.
        </p>
      </div>

      {/* Step indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <button
              onClick={() => (i < step || canProceed()) && setStep(i)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                i === step
                  ? "bg-[#2563EB] text-white"
                  : i < step
                    ? "bg-blue-50 text-[#2563EB]"
                    : "bg-slate-100 text-slate-400"
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">
                {i < step ? "✓" : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </button>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={`h-px w-8 ${i < step ? "bg-[#2563EB]" : "bg-slate-200"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Step 0: Profile */}
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Personal Profile
            </h2>

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
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min={0}
                  max={150}
                  placeholder="Your Age"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Gender
              </label>
              <div className="flex gap-2">
                {(["male", "female", "other"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${
                      gender === g
                        ? "bg-[#2563EB] text-white"
                        : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <TagInput
              label="Medical History"
              tags={medicalHistory}
              onChange={setMedicalHistory}
              placeholder="e.g. Diabetes, Hypertension"
            />
            <TagInput
              label="Current Medications"
              tags={medications}
              onChange={setMedications}
              placeholder="e.g. Metformin 500mg"
            />
            <TagInput
              label="Allergies"
              tags={allergies}
              onChange={setAllergies}
              placeholder="e.g. Penicillin"
            />
          </div>
        )}

        {/* Step 1: Clinical Notes / Document Upload */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Clinical Data
            </h2>

            {/* Toggle between manual and upload */}
            <div className="flex rounded-lg border border-slate-200 p-1">
              <button
                type="button"
                onClick={() => setUploadMode(false)}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  !uploadMode
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Type / Paste Notes
              </button>
              <button
                type="button"
                onClick={() => setUploadMode(true)}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  uploadMode
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Upload Document
              </button>
            </div>

            {!uploadMode ? (
              <>
                <p className="text-sm text-slate-500">
                  Paste doctor&apos;s notes, lab report text, or describe
                  symptoms in your own words.
                </p>
                <textarea
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  rows={10}
                  placeholder="Paste clinical notes here… e.g. 'Patient presents with elevated BP 150/95, FBS 130 mg/dL, reports occasional dizziness and fatigue for the past 2 weeks.'"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
              </>
            ) : (
              <>
                <p className="text-sm text-slate-500">
                  Upload a lab report, prescription, or clinical document.
                  We&apos;ll automatically extract all health parameters — no
                  manual entry needed.
                </p>

                <label
                  htmlFor="doc-upload"
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition-colors ${
                    uploadedFile
                      ? "border-[#2563EB] bg-blue-50"
                      : "border-slate-300 bg-slate-50 hover:border-slate-400"
                  }`}
                >
                  {uploadedFile ? (
                    <>
                      <svg className="mb-3 h-10 w-10 text-[#2563EB]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium text-[#2563EB]">
                        {uploadedFile.name}
                      </span>
                      <span className="mt-1 text-xs text-slate-500">
                        {(uploadedFile.size / 1024).toFixed(1)} KB — Click to
                        change
                      </span>
                    </>
                  ) : (
                    <>
                      <svg className="mb-3 h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <span className="text-sm font-medium text-slate-700">
                        Click to upload or drag and drop
                      </span>
                      <span className="mt-1 text-xs text-slate-500">
                        PDF, PNG, JPG, or TXT (lab reports, prescriptions)
                      </span>
                    </>
                  )}
                  <input
                    id="doc-upload"
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.csv"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setUploadedFile(f);
                    }}
                  />
                </label>

                {uploadedFile && (
                  <button
                    type="button"
                    onClick={() => setUploadedFile(null)}
                    className="text-xs font-medium text-red-500 hover:text-red-700"
                  >
                    Remove file
                  </button>
                )}

                <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                  <p className="text-xs text-blue-700">
                    <strong>How it works:</strong> When you upload a document,
                    our AI reads it, extracts all lab values, medications,
                    diagnoses, and patient info automatically. You can skip
                    Step 3 entirely — just upload and submit.
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 2: Health Parameters */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Health Parameters
              </h2>
              <p className="text-sm text-slate-500">
                All fields are optional. Enter only the values you have.
              </p>
            </div>

            {PARAM_GROUPS.map((group) => (
              <div key={group.heading}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  {group.heading}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.fields.map((field) => (
                    <div key={field.key}>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        {field.label}
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={params[field.key] ?? ""}
                        onChange={(e) => updateParam(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {submitError && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {submitError}
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

          {step < STEP_LABELS.length - 1 ? (
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
              disabled={!canProceed() || submitting}
              className="flex items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Analyzing…
                </>
              ) : (
                "Submit Assessment"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
