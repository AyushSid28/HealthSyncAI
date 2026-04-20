export function cn(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }
  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const severityTextClass: Record<string, string> = {
  low: "text-success",
  moderate: "text-warning",
  high: "text-danger",
  critical: "text-critical",
};

const severityBgClass: Record<string, string> = {
  low: "bg-success/10",
  moderate: "bg-warning/10",
  high: "bg-danger/10",
  critical: "bg-critical/10",
};

export function getSeverityColor(severity: string): string {
  const key = severity.toLowerCase();
  return severityTextClass[key] ?? "text-gray-600";
}

export function getSeverityBgColor(severity: string): string {
  const key = severity.toLowerCase();
  return severityBgClass[key] ?? "bg-gray-100";
}
