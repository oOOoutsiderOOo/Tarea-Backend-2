import { z } from "zod";

export const DirectorSchema = z.object({
    name: z.string().trim().min(1).max(100),
    bio: z.string().trim().min(1).max(100_000),
    imageURL: z.string().trim().url().min(1),
    movies: z.array(z.string()).optional(),
    createdAt: z.date().optional(),
});
