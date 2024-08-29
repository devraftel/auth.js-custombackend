import { z } from "zod";

// Signup
export const UserSignupRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  full_name: z.string().min(1),
  provider: z.string().default("credentials"),
});

export const UserSignupResponseSchema = z.object({
  email: z.string().email(),
  is_active: z.boolean(),
  is_superuser: z.boolean(),
  full_name: z.string(),
  id: z.number(),
  provider: z.string().optional(),
});

export type UserSignupRequest = z.infer<typeof UserSignupRequestSchema>;
export type UserSignupResponse = z.infer<typeof UserSignupResponseSchema>;

// Login
export const LoginRequestSchema = z.object({
  grant_type: z.string().optional(),
  username: z.string(),
  password: z.string(),
  scope: z.string().optional(),
  client_id: z.string().optional(),
  client_secret: z.string().optional(),
});

export const LoginResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// Password update
export const PasswordUpdateRequestSchema = z.object({
  current_password: z.string().min(8),
  new_password: z.string().min(8),
});

export const PasswordUpdateResponseSchema = z.object({
  message: z.string(),
});

export type PasswordUpdateRequest = z.infer<typeof PasswordUpdateRequestSchema>;
export type PasswordUpdateResponse = z.infer<
  typeof PasswordUpdateResponseSchema
>;

// Password Recovery
export const PasswordRecoveryResponseSchema = z.object({
  message: z.string(),
});

export type PasswordRecoveryResponse = z.infer<
  typeof PasswordRecoveryResponseSchema
>;

// Reset password
export const ResetPasswordRequestSchema = z.object({
  token: z.string(),
  new_password: z.string().min(8),
});

export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;

export const ResetPasswordResponseSchema = z.object({
  message: z.string(),
});

export type ResetPasswordResponse = z.infer<typeof ResetPasswordResponseSchema>;
