import { z } from "zod";

export const MovieSchema = z.object({
    directorId: z.union([z.string(), z.number()]),
    title: z.string().trim().min(1).max(100),
    synopsis: z.string().trim().min(1).max(2000),
    coverURL: z.string().url(),
    link: z.string().url(),
});
