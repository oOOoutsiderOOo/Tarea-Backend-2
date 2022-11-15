import { Request, Response, NextFunction } from "express";
import { createToken, decodeToken } from "../services";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: "You are not logged in" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const payload = decodeToken(token);
    console.log(payload);
    next();
};

export default isAuth;
