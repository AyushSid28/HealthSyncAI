export interface LifestyleParams {
  smoking: boolean;
  alcohol_frequency: "none" | "occasional" | "moderate" | "heavy";
  exercise_frequency: "sedentary" | "light" | "moderate" | "active";
  diet_type: "vegetarian" | "non_vegetarian" | "vegan" | "other";
  sleep_hours: number | null;
}

export interface ClinicalNotes {
  raw_text: string;
  source: "manual" | "voice" | "doctor_upload";
}

export interface UserProfile {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  medical_history: string[];
  current_medications: string[];
  allergies: string[];
  lifestyle?: LifestyleParams | null;
}

export interface QuantitativeParams {
  blood_pressure_systolic?: number | null;
  blood_pressure_diastolic?: number | null;
  heart_rate?: number | null;
  blood_glucose_fasting?: number | null;
  blood_glucose_pp?: number | null;
  hba1c?: number | null;
  total_cholesterol?: number | null;
  hdl_cholesterol?: number | null;
  ldl_cholesterol?: number | null;
  triglycerides?: number | null;
  bmi?: number | null;
  hemoglobin?: number | null;
  creatinine?: number | null;
  tsh?: number | null;
  vitamin_d?: number | null;
  vitamin_b12?: number | null;
}

export interface AssessmentRequest {
  clinical_notes?: ClinicalNotes | null;
  profile: UserProfile;
  parameters?: QuantitativeParams | null;
  language: "en" | "hi" | "mr";
}

export interface InterpretedFinding {
  parameter_name: string;
  clinical_value: string;
  interpretation: string;
  context: string;
  category: string;
}

export interface RiskCard {
  indicator: string;
  severity: "low" | "moderate" | "high" | "critical";
  color: "green" | "amber" | "red" | "dark_red";
  value: string;
  threshold_range: string;
  explanation: string;
  urgency_flag: boolean;
}

export interface WellnessScore {
  composite_score: number;
  dimensions: Record<string, number>;
}

export interface Recommendation {
  category: string;
  title: string;
  description: string;
  timeframe: string;
  priority: "essential" | "recommended" | "optional";
  related_risk: string;
}

export interface ReportSection {
  title: string;
  content: unknown;
}

export interface FullReport {
  report_id: string;
  generated_at: string;
  language: string;
  profile_summary: ReportSection;
  key_observations: ReportSection;
  interpreted_findings: InterpretedFinding[];
  risk_indicators: RiskCard[];
  wellness_insights: ReportSection;
  personalized_recommendations: Recommendation[];
  preventive_lifestyle: ReportSection;
  wellness_score: WellnessScore;
  urgency_alerts: string[];
  data_completeness: number;
  longitudinal_comparison: Record<string, unknown> | null;
  qa_passed: boolean;
  qa_notes: string[];
  disclaimer: string;
}

export interface AssessmentResponse {
  report_id: string;
  status: string;
  report: FullReport;
  errors: string[];
}

export interface ReportSummary {
  report_id: string;
  generated_at: string;
  wellness_score: number | null;
  language: string;
}

export interface ReportsListResponse {
  reports: ReportSummary[];
}
