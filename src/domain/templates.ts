import { ScheduleTemplate } from "./models";
import { validateTemplate } from "./validators";
import { store } from "./store";

export function createTemplate( template: ScheduleTemplate ): ScheduleTemplate {
  
    const validation = validateTemplate(template);

  if (!validation.ok) {
    throw new Error(
      `Invalid template: ${validation.errors.join(", ")}`
    );
  }

  store.templates.set(template.id, template);
  return template;
}
