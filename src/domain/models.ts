export type UUID = string;
export type TZ = string; // IANA timezone

export type ExamTypeId = string;

export interface Clinic {
  id: UUID;
  name: string;
  timezone: TZ;
}

export interface Resource {
  id: UUID;
  clinicId: UUID;
  name: string;
  kind: "MACHINE" | "TECHNICIAN";
  capabilities: ExamTypeId[];
}

export type ScheduleState = "OPEN" | "CLOSED" | "RESTRICTED";

export interface TimeRange {
  start: string; // "HH:mm"
  end: string;   // "HH:mm"
  state: ScheduleState;
  allowedExamTypes?: ExamTypeId[];
}

export interface WeekdayRule {
  weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  ranges: TimeRange[];
}

export interface ScheduleTemplate {
  id: UUID;
  name: string;
  description?: string;
  rules: WeekdayRule[];
  defaultState?: ScheduleState;
}

export interface TemplateAssignment {
  id: UUID;
  templateId: UUID;
  resourceId: UUID;
  effectiveStartDate: string; // YYYY-MM-DD
  effectiveEndDate?: string;
  priority: number;
}

export interface ExceptionOverride {
  id: UUID;
  scope: { kind: "RESOURCE" | "CLINIC"; id: UUID };
  startDate: string;
  endDate: string;
  replacement:
    | WeekdayRule[]
    | { state: ScheduleState; allowedExamTypes?: ExamTypeId[] };
}

export type ResolvedBlock = {
  date: string;
  startISO: string;
  endISO: string;
  state: ScheduleState;
  allowedExamTypes?: ExamTypeId[];
  source: { type: "TEMPLATE" | "EXCEPTION"; id: UUID };
};

export interface ComputeRequest {
  resourceId: UUID;
  fromDate: string;
  toDate: string;
}

export interface ComputeResponse {
  resourceId: UUID;
  blocks: ResolvedBlock[];
}

export {};
