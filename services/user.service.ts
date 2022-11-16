import bcrypt from "bcrypt";
import { MongooseError } from "mongoose";
import { createToken } from "../services";
const User = require("../models/user");
const Movie = require("../models/movie");

export const loginService = async (email: string, password: string) => {
    const dbUser = await User.findOne({ email });
    if (!dbUser || !bcrypt.compareSync(password, dbUser.password)) {
        return { status: 401, error: "Invalid credentials" };
    }
    const token = createToken(dbUser._id);
    return { status: 200, token };
};

export const registerService = async (email: string, password: string) => {
    const newUser = new User({
        email,
        password,
    });
    const takenQuery = await User.findOne({ email: newUser.email }).catch((error: MongooseError) => {
        return { status: 500, error };
    });
    if (takenQuery) {
        return { status: 400, error: "User already exists" };
    }

    await newUser.save((error: MongooseError) => {
        if (error) {
            return { status: 400, error: "Email is taken" };
        }
    });
    return { status: 200, message: "Signup success! Please login." };
};

export const addFavService = async (userId: string, favId: string) => {
    try {
        const user = await User.findById(userId).catch((error: MongooseError) => {
            throw { status: 400, message: "User id is not valid", error };
        });
        const fav = await Movie.findById(favId).catch((error: MongooseError) => {
            throw { status: 400, message: "Favorite id is not valid", error };
        });

        if (!user || !fav) {
            throw { status: 400, message: "User or favorite does not exist" };
        }

        const favExists = user.favorites.find((favorite: any) => favorite.toString() === favId);
        if (favExists) {
            throw { status: 400, message: "Favorite already exists" };
        }

        user.favorites.push(fav._id);
        await user.save().catch((error: MongooseError) => {
            throw { status: 500, message: "Error saving user", error };
        });

        return { status: 200, message: "Favorite added" };
    } catch (error) {
        throw error;
    }
};
