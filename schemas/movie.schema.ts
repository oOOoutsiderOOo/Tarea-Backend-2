import { z } from "zod";

export const MovieSchema = z.object({
    name: z.string().trim().min(1).max(100),
    sinopsis: z.string().trim().min(1).max(2000),
    coverURL: z.string().trim().url().min(1),
    link: z.string().trim().url().min(1),
});
