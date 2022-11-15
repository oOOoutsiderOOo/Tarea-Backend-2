"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSchema = void 0;
const zod_1 = require("zod");
exports.MovieSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1).max(100),
    sinopsis: zod_1.z.string().trim().min(1).max(2000),
    coverURL: zod_1.z.string().trim().url().min(1),
    link: zod_1.z.string().trim().url().min(1),
});
