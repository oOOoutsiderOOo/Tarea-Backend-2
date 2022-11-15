import { Schema } from "mongoose";
import mongoose from "mongoose";

const MovieSchema = new Schema({
    name: { type: String, required: true },
    sinopsis: { type: String, required: true },
    coverURL: { type: String, required: true },
    link: { type: String, required: true },
});

module.exports = mongoose.model("Movie", MovieSchema);
