"use client";

import { useState } from "react";

const CATEGORIES = [
  { id: "student", label: "Student" },
  { id: "professional", label: "Working Professional" },
  { id: "employee", label: "Corporate Employee" },
  { id: "other", label: "Other (please specify)" },
];

const QUESTIONS = [
  {
    id: "q1",
    question: "How often should one get a complete health check-up (including blood work, lipid profile, and thyroid function)?",
    options: [
      "Once every 5 years",
      "Once a year after age 25",
      "Only when feeling unwell",
      "Once every 10 years",
    ],
    correct: 1,
  },
  {
    id: "q2",
    question: "Which of the following is the most effective daily habit for improving both physical and mental wellness?",
    options: [
      "Skipping breakfast to reduce calorie intake",
      "Sleeping only 4-5 hours to have more productive time",
      "30 minutes of moderate exercise like brisk walking or yoga",
      "Consuming energy drinks for sustained focus",
    ],
    correct: 2,
  },
  {
    id: "q3",
    question: "What is the recommended daily water intake for an average adult to maintain proper hydration and kidney function?",
    options: [
      "1-2 glasses per day",
      "Only when you feel thirsty",
      "2.5 to 3.5 litres (8-12 glasses) per day",
      "5+ litres per day regardless of activity",
    ],
    correct: 2,
  },
  {
    id: "q4",
    question: "Which Ayurvedic practice is scientifically supported for reducing chronic stress and improving emotional resilience?",
    options: [
      "Eating only raw food at all times",
      "Pranayama (controlled breathing exercises) and meditation",
      "Avoiding all physical activity during stress",
      "Consuming herbal supplements without medical guidance",
    ],
    correct: 1,
  },
  {
    id: "q5",
    question: "A wellness score of 0-100 on a health dashboard typically factors in which of these dimensions?",
    options: [
      "Only blood pressure and cholesterol levels",
      "Physical fitness, mental health, emotional balance, and lifestyle habits",
      "Only BMI and body weight",
      "Social media activity and screen time",
    ],
    correct: 1,
  },
];

export default function FeedbackPage() {
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  function setAnswer(qId: string, optionIdx: number) {
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  }

  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);
  const canSubmit = email.trim() !== "" && category !== "" && allAnswered && (category !== "other" || otherCategory.trim() !== "");

  function handleSubmit() {
    const score = QUESTIONS.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
    setSubmitted(true);
    console.log("Form data:", { email, category: category === "other" ? otherCategory : category, answers, score });
  }

  if (submitted) {
    const score = QUESTIONS.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <svg className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-900">Thank You for Your Feedback!</h1>
        <p className="mt-3 text-sm text-slate-600">Your response has been recorded.</p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
          <h3 className="text-center text-lg font-semibold text-slate-900">
            Your Score: <span className="text-[#2563EB]">{score}/{QUESTIONS.length}</span>
          </h3>
          <div className="mt-6 space-y-4">
            {QUESTIONS.map((q, qi) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correct;
              return (
                <div key={q.id} className={`rounded-xl border p-4 ${isCorrect ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}>
                  <p className="text-sm font-medium text-slate-900">Q{qi + 1}: {q.question}</p>
                  <p className="mt-1 text-xs text-slate-600">
                    Your answer: <span className={isCorrect ? "font-semibold text-emerald-700" : "font-semibold text-red-700"}>{q.options[userAnswer]}</span>
                  </p>
                  {!isCorrect && (
                    <p className="mt-1 text-xs text-emerald-700">
                      Correct answer: <span className="font-semibold">{q.options[q.correct]}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => { setSubmitted(false); setEmail(""); setCategory(""); setOtherCategory(""); setAnswers({}); }}
          className="mt-6 text-sm font-medium text-[#2563EB] hover:underline"
        >
          Submit Another Response
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Wellness Feedback Survey</h1>
        <p className="mt-1 text-sm text-slate-500">
          Help us improve HealthSync AI by sharing your feedback and testing your health knowledge.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Email */}
        <div className="mb-6">
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
          />
        </div>

        {/* Category */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Which category best describes you? <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <label
                key={cat.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                  category === cat.id
                    ? "border-[#2563EB] bg-blue-50 ring-1 ring-[#2563EB]"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  value={cat.id}
                  checked={category === cat.id}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-4 w-4 text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="text-sm text-slate-700">{cat.label}</span>
              </label>
            ))}
          </div>
          {category === "other" && (
            <input
              value={otherCategory}
              onChange={(e) => setOtherCategory(e.target.value)}
              placeholder="Please specify your category..."
              className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            />
          )}
        </div>

        {/* Divider */}
        <div className="mb-8 border-t border-slate-100">
          <p className="mt-6 text-sm font-semibold text-slate-900">Wellness Knowledge Quiz</p>
          <p className="mt-1 text-xs text-slate-500">Test your health awareness with these 5 questions.</p>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {QUESTIONS.map((q, qi) => (
            <div key={q.id}>
              <p className="mb-3 text-sm font-medium text-slate-900">
                {qi + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => (
                  <label
                    key={oi}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                      answers[q.id] === oi
                        ? "border-[#2563EB] bg-blue-50 ring-1 ring-[#2563EB]"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === oi}
                      onChange={() => setAnswer(q.id, oi)}
                      className="h-4 w-4 text-[#2563EB] focus:ring-[#2563EB]"
                    />
                    <span className="text-sm text-slate-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit Feedback
          </button>
          {!canSubmit && (
            <p className="mt-2 text-center text-xs text-slate-400">
              Please fill in all fields and answer all questions to submit.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
