"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    email: zod_1.z.string().trim().email(),
    password: zod_1.z.string().min(6),
    favorites: zod_1.z.array(zod_1.z.string()).optional(),
    createdAt: zod_1.z.date().optional(),
});
