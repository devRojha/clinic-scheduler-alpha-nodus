import { ComputeRequest, ComputeResponse } from "./models";


export function computeCalendar(
  req: ComputeRequest
): ComputeResponse {
    // need to performs
  // 1. Load resource & clinic
  // 2. Iterate dates
  // 3. Apply exception or templates
  // 4. Resolve conflicts
  // 5. Emit ResolvedBlock[]
  return {
    resourceId: req.resourceId,
    blocks: []
  };
}
