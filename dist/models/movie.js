"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const MovieSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    sinopsis: { type: String, required: true },
    coverURL: { type: String, required: true },
    link: { type: String, required: true },
});
module.exports = mongoose_2.default.model("Movie", MovieSchema);
