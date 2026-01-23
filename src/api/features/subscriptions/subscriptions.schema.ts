import { z } from "zod";
import { SubscriptionStatus } from "@prisma/client";

export const SubscriptionSchema = z.object({
  id: z.number().optional(),
  userId: z.string(),
  orderId: z.number(),
  status: z.nativeEnum(SubscriptionStatus).default(SubscriptionStatus.ACTIVE),
  startDate: z.date().or(z.string().datetime()).optional(),
  endDate: z.date().or(z.string().datetime()),
});

export type SubscriptionInput = z.infer<typeof SubscriptionSchema>;
