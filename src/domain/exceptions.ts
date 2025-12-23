import { ExceptionOverride } from "./models";
import { store } from "./store";

export function addException( exception: ExceptionOverride ): ExceptionOverride {
  store.exceptions.set(exception.id, exception);
  return exception;
}
