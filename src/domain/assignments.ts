import { TemplateAssignment } from "./models";
import { store } from "./store";

export function assignTemplate(
  assignment: TemplateAssignment
): TemplateAssignment {
  if (!store.templates.has(assignment.templateId)) {
    throw new Error("Template does not exist");
  }

  if (!store.resources.has(assignment.resourceId)) {
    throw new Error("Resource does not exist");
  }

  store.assignments.set(assignment.id, assignment);
  return assignment;
}
