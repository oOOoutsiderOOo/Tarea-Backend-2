import { Schema } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    favorites: { type: Array },
    createdAt: { type: Date, default: Date.now() },
});

UserSchema.pre("save", function (next) {
    let user = this;

    bcrypt.genSalt(10, (error, salt) => {
        if (error) {
            return next(error);
        }

        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) {
                return next(error);
            }

            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model("User", UserSchema);
