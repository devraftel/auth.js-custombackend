import { z } from "zod";

// Me
export const UserResponseSchema = z.object({
  email: z.string().email(),
  is_active: z.boolean(),
  is_superuser: z.boolean(),
  full_name: z.string().nullable(),
  tokens: z.number(),
  id: z.number(),
  provider: z.string().optional(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;

// Delete user
export const UserDeleteResponseSchema = z.object({
  message: z.string(),
});

export type UserDeleteResponse = z.infer<typeof UserDeleteResponseSchema>;

// Update tokens
export const UpdateTokensRequestSchema = z.object({
  tokens_deducted: z.number().min(0),
});

export type UpdateTokensRequest = z.infer<typeof UpdateTokensRequestSchema>;

// Update User
export const UpdateUserRequestSchema = z.object({
  full_name: z.string().min(1),
  email: z.string().email(),
});

export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;

// User Tokens
export const UserTokensSchema = UserResponseSchema.pick({ tokens: true });

export type UserTokens = z.infer<typeof UserTokensSchema>;
