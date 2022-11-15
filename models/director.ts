import { Schema } from "mongoose";
import mongoose from "mongoose";

const DirectorSchema = new Schema({
    name: { type: String, required: true },
    bio: { type: String, required: true },
    imageURL: { type: String, required: true },
    movies: { type: Array },
    createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Director", DirectorSchema);
