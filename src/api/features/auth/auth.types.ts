import { z } from "zod";

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  name: z.string().optional(),
});

export type SignupInput = z.infer<typeof SignupSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
