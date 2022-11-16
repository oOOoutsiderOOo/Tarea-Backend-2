"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const isAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: "You are not logged in" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const payload = (0, services_1.decodeToken)(token);
    if (payload === null || payload === void 0 ? void 0 : payload.message) {
        return res.status(401).send(payload.message);
    }
    next();
};
exports.default = isAuth;
