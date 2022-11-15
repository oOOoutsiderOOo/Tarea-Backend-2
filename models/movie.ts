import { Schema } from "mongoose";
import mongoose from "mongoose";

const MovieSchema = new Schema({
    directorId: { type: String, required: true },
    title: { type: String, required: true },
    synopsis: { type: String, required: true },
    coverURL: { type: String, required: true },
    link: { type: String, required: true },
});

module.exports = mongoose.model("Movie", MovieSchema);
