import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../services";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: "You are not logged in" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const payload = decodeToken(token);
    if (payload?.message) {
        return res.status(401).send(payload.message);
    }
    next();
};

export default isAuth;
