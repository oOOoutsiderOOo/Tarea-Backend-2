"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const DirectorSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    bio: { type: String, required: true },
    imageURL: { type: String, required: true },
    movies: { type: Array },
    createdAt: { type: Date, default: Date.now() },
});
module.exports = mongoose_2.default.model("Director", DirectorSchema);
