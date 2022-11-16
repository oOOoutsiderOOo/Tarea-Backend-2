import { Schema } from "mongoose";
import mongoose from "mongoose";

const MovieSchema = new Schema({
    directorId: { type: Schema.Types.ObjectId, required: true, ref: "Director" },
    title: { type: String, required: true, unique: true },
    synopsis: { type: String, required: true },
    coverURL: { type: String, required: true },
    link: { type: String, required: true },
});

module.exports = mongoose.model("Movie", MovieSchema);
