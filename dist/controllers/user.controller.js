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
exports.register = exports.login = void 0;
const services_1 = require("../services");
const User = require("../models/user");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const dbUser = yield User.findOne({ email });
    if (!dbUser) {
        return res.status(400).send({ error: "User not found" });
    }
    const response = (0, services_1.createToken)(email);
    res.status(200).send(response);
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.register = register;
