import { z } from "zod";
import { ProductType } from "@prisma/client";

export const CreateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  type: z.nativeEnum(ProductType),
  price: z.number().int().min(0),
  currency: z.string().default("INR"),
  isActive: z.boolean().default(true),
  metadata: z.any().optional(),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
