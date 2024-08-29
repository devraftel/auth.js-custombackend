import { z } from "zod";

export * from "./auth";
export * from "./user";

// Error schema
export const ErrorResponseSchema = z.object({
  detail: z.union([
    z.string(),
    z.array(
      z.object({
        loc: z.array(z.union([z.string(), z.number()])),
        msg: z.string(),
        type: z.string(),
      }),
    ),
  ]),
});
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
