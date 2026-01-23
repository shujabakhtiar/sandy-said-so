import { z } from "zod";

export const CreateOrderSchema = z.object({
  productId: z.number().optional(), // If buying a specific product/package
  deckId: z.number().optional(),    // Legacy or specific deck purchase
  gameModeId: z.number().optional(), // If buying a mode
  affiliateCode: z.string().optional(),
  amount: z.number().int(),
  currency: z.string().default("INR"),
  // Delivery info for physical decks (keeping legacy support)
  customerEmail: z.string().email().optional(),
  address: z.string().min(10, "Please provide a complete shipping address").optional(),
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
