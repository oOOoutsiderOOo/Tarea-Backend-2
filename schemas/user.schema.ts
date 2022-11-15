import { z } from "zod";

export const UserSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(6),
    favorites: z.array(z.string()).optional(),
    createdAt: z.date().optional(),
});
