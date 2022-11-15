"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectorSchema = void 0;
const zod_1 = require("zod");
exports.DirectorSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1).max(100),
    bio: zod_1.z.string().trim().min(1).max(100000),
    imageURL: zod_1.z.string().trim().url().min(1),
    movies: zod_1.z.array(zod_1.z.string()).optional(),
    createdAt: zod_1.z.date().optional(),
});
