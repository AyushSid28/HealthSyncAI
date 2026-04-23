import type {
  AssessmentRequest,
  AssessmentResponse,
  FullReport,
} from "@/types";

function getBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL;
  if (raw && raw.trim()) {
    return raw.replace(/\/$/, "");
  }
  return "/api/v1";
}

function formatHttpDetail(detail: unknown): string {
  if (typeof detail === "string") {
    return detail;
  }
  try {
    return JSON.stringify(detail);
  } catch {
    return String(detail);
  }
}

async function readJsonBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new Error(
      res.ok ? "Invalid JSON in response body" : text || `HTTP ${res.status}`
    );
  }
}

function assertOk(res: Response, body: unknown, label: string): void {
  if (res.ok) {
    return;
  }
  if (body && typeof body === "object" && "detail" in body) {
    throw new Error(formatHttpDetail((body as { detail: unknown }).detail));
  }
  throw new Error(`${label}: ${res.status}`);
}

export async function submitAssessment(
  data: AssessmentRequest
): Promise<AssessmentResponse> {
  const res = await fetch(`${getBaseUrl()}/assess`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await readJsonBody(res);
  assertOk(res, body, "Assessment submit failed");
  return body as AssessmentResponse;
}

export async function submitAssessmentSync(
  data: AssessmentRequest
): Promise<AssessmentResponse> {
  const res = await fetch(`${getBaseUrl()}/assess/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await readJsonBody(res);
  assertOk(res, body, "Sync assessment failed");
  return body as AssessmentResponse;
}

export async function getReport(reportId: string): Promise<FullReport> {
  const res = await fetch(`${getBaseUrl()}/reports/${encodeURIComponent(reportId)}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  const body = await readJsonBody(res);
  assertOk(res, body, "Get report failed");
  return body as FullReport;
}

export function getReportPdfUrl(reportId: string): string {
  return `${getBaseUrl()}/reports/${encodeURIComponent(reportId)}/pdf`;
}

export async function submitDocumentUpload(
  file: File,
  profile: Record<string, unknown>,
  language: string
): Promise<AssessmentResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("profile_json", JSON.stringify(profile));
  formData.append("language", language);

  const res = await fetch(`${getBaseUrl()}/assess/upload`, {
    method: "POST",
    body: formData,
  });
  const body = await readJsonBody(res);
  assertOk(res, body, "Document upload failed");
  return body as AssessmentResponse;
}

export async function listReports(): Promise<{ reports: any[] }> {
  const res = await fetch(`${getBaseUrl()}/reports`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  const body = await readJsonBody(res);
  assertOk(res, body, "List reports failed");
  return body as { reports: any[] };
}

export async function sendReportSMS(
  reportId: string,
  phoneNumber: string,
  lang: string = "en"
): Promise<{ status: string }> {
  const res = await fetch(`${getBaseUrl()}/deliver/sms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ report_id: reportId, phone_number: phoneNumber, lang }),
  });
  const body = await readJsonBody(res);
  assertOk(res, body, "SMS delivery failed");
  return body as { status: string };
}

export async function sendReportEmail(
  reportId: string,
  email: string,
  lang: string = "en"
): Promise<{ status: string }> {
  const res = await fetch(`${getBaseUrl()}/deliver/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ report_id: reportId, email, lang }),
  });
  const body = await readJsonBody(res);
  assertOk(res, body, "Email delivery failed");
  return body as { status: string };
}
