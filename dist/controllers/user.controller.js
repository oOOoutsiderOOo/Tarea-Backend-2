"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFav = exports.register = exports.login = void 0;
const services_1 = require("../services");
const schemas_1 = require("../schemas");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const parseResult = schemas_1.UserSchema.safeParse({ email, password });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error });
    }
    const user = yield (0, services_1.loginService)(parseResult.data.email, password).catch(error => {
        return res.status(500).send({ error: error.message });
    });
    res.status(user.status).send(user);
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const parseResult = schemas_1.UserSchema.safeParse({ email, password });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error });
    }
    const response = yield (0, services_1.registerService)(parseResult.data.email, password).catch(error => {
        return res.status(500).send({ error: error.message });
    });
    res.status(response.status).send(response);
});
exports.register = register;
const addFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, favId } = req.body;
    const response = yield (0, services_1.addFavService)(userId, favId).catch(error => {
        return res.status(error.status || 500).send(error);
    });
    res.status(response.status).send(response.message);
});
exports.addFav = addFav;
