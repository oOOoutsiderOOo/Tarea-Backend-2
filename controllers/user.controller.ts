import { Request, Response } from "express";
import { createToken } from "../services";
const User = require("../models/user");

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const dbUser = await User.findOne({ email });
    if (!dbUser) {
        return res.status(400).send({ error: "User not found" });
    }
    const response = createToken(email);
    res.status(200).send(response);
};

const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const newUser = new User({
        email,
        password,
    });

    User.findOne({ email: newUser.email }, (error, user) => {
        if (error) {
            return res.status(500).send({ error });
        }
        if (user) {
            return res.status(400).send({ error: "User already exists" });
        }

        newUser.save(error => {
            if (error) {
                return res.status(400).send({
                    error: "Email is taken",
                });
            }
            res.status(201).send({
                message: "Signup success! Please login.",
            });
        });
    });
};

export { login, register };
