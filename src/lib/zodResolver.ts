import type { FieldErrors, FieldValues, Resolver } from "react-hook-form";
import type { ZodType } from "zod";

// ─── MINIMAL ZOD RESOLVER ──────────────────────────────────────────────────
// `react-hook-form` and `zod` are already project dependencies, but the
// `@hookform/resolvers` glue package is not installed. Rather than add a new
// dependency for a handful of lines, this reproduces just the piece of it
// this project needs: run the schema, map zod issues onto RHF's field-error
// shape so `formState.errors` and `setError` behave exactly as expected.
export function zodResolver<T extends FieldValues>(schema: ZodType<T>): Resolver<T> {
  return async (values) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors: FieldErrors<T> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join(".") as keyof FieldErrors<T>;
      if (!errors[path]) {
        // @ts-expect-error - building up a dynamic path -> error map
        errors[path] = { type: issue.code, message: issue.message };
      }
    }

    return { values: {}, errors };
  };
}
