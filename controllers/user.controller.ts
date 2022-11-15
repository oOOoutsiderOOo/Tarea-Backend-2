import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import bcrypt from "bcrypt";
import { createToken } from "../services";
import { IUser } from "../models/user";
import { UserSchema } from "../schemas";
const User = require("../models/user");

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const parseResult = UserSchema.safeParse({ email, password });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error.message });
    }

    const dbUser = await User.findOne({ email: parseResult.data.email });
    if (!dbUser) {
        return res.status(400).send({ error: "User not found" });
    }
    if (!bcrypt.compareSync(password, dbUser.password)) {
        return res.status(400).send({ error: "Invalid password" });
    }
    const token = createToken(dbUser._id);
    res.status(200).send({ token });
};

const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const parseResult = UserSchema.safeParse({ email, password });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error.message });
    }

    const newUser = new User({
        email: parseResult.data.email,
        password: parseResult.data.password,
    });

    User.findOne({ email: newUser.email }, (error: MongooseError, user: IUser) => {
        if (error) {
            return res.status(500).send({ error });
        }
        if (user) {
            return res.status(400).send({ error: "User already exists" });
        }

        newUser.save((error: MongooseError) => {
            if (error) {
                return res.status(400).send({
                    error: "Email is taken",
                });
            }
            res.status(200)
                .send({
                    message: "Signup success! Please login.",
                })
                .redirect("/login");
        });
    });
};

const addFav = async (req: Request, res: Response) => {};

export { login, register, addFav };
