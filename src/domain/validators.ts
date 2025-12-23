import { ScheduleTemplate, TimeRange } from "./models";

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function validateRanges(ranges: TimeRange[], day: number, errors: string[]) {
  const sorted = [...ranges].sort(
    (a, b) => timeToMinutes(a.start) - timeToMinutes(b.start)
  );

  for (let i = 0; i < sorted.length; i++) {
    const r = sorted[i];
    const start = timeToMinutes(r.start);
    const end = timeToMinutes(r.end);

    if (start >= end) {
      errors.push(
        `Invalid range ${r.start}-${r.end} on weekday ${day}`
      );
    }

    if (r.state === "RESTRICTED") {
      if (!r.allowedExamTypes || r.allowedExamTypes.length === 0) {
        errors.push(
          `Restricted range ${r.start}-${r.end} must specify allowedExamTypes`
        );
      }
    }

    if (i > 0) {
      const prev = sorted[i - 1];
      if (timeToMinutes(prev.end) > start) {
        errors.push(
          `Overlapping ranges on weekday ${day}: ${prev.start}-${prev.end} overlaps ${r.start}-${r.end}`
        );
      }
    }
  }
}

export function validateTemplate(
  template: ScheduleTemplate
): { ok: true } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  for (const rule of template.rules) {
    validateRanges(rule.ranges, rule.weekday, errors);
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return { ok: true };
}
