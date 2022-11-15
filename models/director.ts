import { Schema } from "mongoose";
import mongoose from "mongoose";

const DirectorSchema = new Schema({
    name: { type: String, required: true, unique: true },
    bio: { type: String, required: true },
    imageURL: { type: String, required: true },
    movies: { type: [String] },
    createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Director", DirectorSchema);
