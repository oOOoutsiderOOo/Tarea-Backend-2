import { Schema, Document } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
    email: string;
    password: string;
    favorites?: string[];
    createdAt?: Date;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema<IUserModel>({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    favorites: { type: [Schema.Types.ObjectId], ref: "Movie" },
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

module.exports = mongoose.model<IUserModel>("User", UserSchema);
