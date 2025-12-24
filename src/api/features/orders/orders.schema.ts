import { z } from "zod";

export const CreateOrderSchema = z.object({
  deckId: z.string().cuid(),
  customerEmail: z.string().email(),
  address: z.string().min(10, "Please provide a complete shipping address"),
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
