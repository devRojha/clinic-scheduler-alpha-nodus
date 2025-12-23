import {
  Clinic,
  Resource,
  ScheduleTemplate,
  TemplateAssignment,
  ExceptionOverride,
  UUID
} from "./models";

// In-memory store for the exercise

export const store = {
  clinics: new Map<UUID, Clinic>(),
  resources: new Map<UUID, Resource>(),
  templates: new Map<UUID, ScheduleTemplate>(),
  assignments: new Map<UUID, TemplateAssignment>(),
  exceptions: new Map<UUID, ExceptionOverride>()
};
