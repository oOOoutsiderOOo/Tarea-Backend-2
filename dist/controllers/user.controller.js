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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFav = exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const services_1 = require("../services");
const schemas_1 = require("../schemas");
const User = require("../models/user");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const parseResult = schemas_1.UserSchema.safeParse({ email, password });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error.message });
    }
    const dbUser = yield User.findOne({ email: parseResult.data.email });
    if (!dbUser) {
        return res.status(400).send({ error: "User not found" });
    }
    if (!bcrypt_1.default.compareSync(password, dbUser.password)) {
        return res.status(400).send({ error: "Invalid password" });
    }
    const token = (0, services_1.createToken)(dbUser._id);
    res.status(200).send({ token });
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const parseResult = schemas_1.UserSchema.safeParse({ email, password });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error.message });
    }
    const newUser = new User({
        email: parseResult.data.email,
        password: parseResult.data.password,
    });
    User.findOne({ email: newUser.email }, (error, user) => {
        if (error) {
            return res.status(500).send({ error });
        }
        if (user) {
            return res.status(400).send({ error: "User already exists" });
        }
        newUser.save((error) => {
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
});
exports.register = register;
const addFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.addFav = addFav;
