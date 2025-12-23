import { createTemplate } from "../../src/domain/templates";
import { assignTemplate } from "../../src/domain/assignments";
import { addException } from "../../src/domain/exceptions";
import { store } from "../../src/domain/store";
import { ScheduleTemplate } from "../../src/domain/models";

import { describe, it, expect, beforeEach } from "vitest";

describe("Domain CRUD", () => {
  beforeEach(() => {
    store.templates.clear();
    store.assignments.clear();
    store.exceptions.clear();
    store.resources.clear();
  });

  it("creates a valid template", () => {
    const template: ScheduleTemplate = {
      id: "t1",
      name: "Weekday Open",
      rules: [
        {
          weekday: 1,
          ranges: [{ start: "09:00", end: "17:00", state: "OPEN" }]
        }
      ]
    };

    const result = createTemplate(template);
    expect(result.id).toBe("t1");
  });

  it("rejects invalid template", () => {
    const template: ScheduleTemplate = {
      id: "t2",
      name: "Bad",
      rules: [
        {
          weekday: 1,
          ranges: [{ start: "17:00", end: "09:00", state: "OPEN" }]
        }
      ]
    };

    expect(() => createTemplate(template)).toThrow();
  });
});
