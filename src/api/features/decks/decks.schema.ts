import { z } from "zod";

export const CreateDeckSchema = z.object({
  name: z.string().optional(),
  gameMode: z.enum(["DRINKING", "TRUTH_DARE", "COUPLES"]),
  persons: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      photos: z.array(z.string().url("Invalid photo URL")).min(1, "At least one photo per person"),
    })
  ).min(2, "Upload at least 2 people to play"),
});

export type CreateDeckInput = z.infer<typeof CreateDeckSchema>;
