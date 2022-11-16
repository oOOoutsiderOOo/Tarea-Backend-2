"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    favorites: { type: [mongoose_1.Schema.Types.ObjectId], ref: "Movie" },
    createdAt: { type: Date, default: Date.now() },
});
UserSchema.pre("save", function (next) {
    let user = this;
    bcrypt_1.default.genSalt(10, (error, salt) => {
        if (error) {
            return next(error);
        }
        bcrypt_1.default.hash(user.password, salt, (error, hash) => {
            if (error) {
                return next(error);
            }
            user.password = hash;
            next();
        });
    });
});
module.exports = mongoose_2.default.model("User", UserSchema);
