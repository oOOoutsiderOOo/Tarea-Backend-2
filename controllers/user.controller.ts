import { Request, Response } from "express";
import { loginService, registerService, addFavService } from "../services";
import { UserSchema } from "../schemas";
const User = require("../models/user");

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const parseResult = UserSchema.safeParse({ email, password });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error.message });
    }

    const user = await loginService(parseResult.data.email, password).catch(error => {
        return res.status(500).send({ error: error.message });
    });
    res.status(user.status as number).send({ ...user });
};

const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const parseResult = UserSchema.safeParse({ email, password });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error.message });
    }

    const response = await registerService(parseResult.data.email, password).catch(error => {
        return res.status(500).send({ error: error.message });
    });

    res.status(response.status as number).send(response);
};

const addFav = async (req: Request, res: Response) => {
    const { userId, favId } = req.body;

    const response = await addFavService(userId, favId).catch(error => {
        return res.status(500).send({ error: error.message });
    });

    res.status(response.status as number).send(response);
};

export { login, register, addFav };
