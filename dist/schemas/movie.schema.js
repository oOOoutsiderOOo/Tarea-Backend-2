"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSchema = void 0;
const zod_1 = require("zod");
exports.MovieSchema = zod_1.z.object({
    directorId: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]),
    title: zod_1.z.string().trim().min(1).max(100),
    synopsis: zod_1.z.string().trim().min(1).max(2000),
    coverURL: zod_1.z.string().url(),
    link: zod_1.z.string().url(),
});
