import { z } from "zod";

export const CreateAffiliateSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").max(20),
  userId: z.string().optional(),
});

export const ValidateAffiliateSchema = z.object({
  code: z.string(),
});

export type CreateAffiliateInput = z.infer<typeof CreateAffiliateSchema>;
