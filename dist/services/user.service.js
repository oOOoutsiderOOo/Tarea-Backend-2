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
exports.addFavService = exports.registerService = exports.loginService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const services_1 = require("../services");
const User = require("../models/user");
const Movie = require("../models/movie");
const loginService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const dbUser = yield User.findOne({ email });
    if (!dbUser || !bcrypt_1.default.compareSync(password, dbUser.password)) {
        return { status: 401, error: "Invalid credentials" };
    }
    const token = (0, services_1.createToken)(dbUser._id);
    return { status: 200, token };
});
exports.loginService = loginService;
const registerService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new User({
        email,
        password,
    });
    const takenQuery = yield User.findOne({ email: newUser.email }).catch((error) => {
        return { status: 500, error };
    });
    if (takenQuery) {
        return { status: 400, error: "User already exists" };
    }
    yield newUser.save((error) => {
        if (error) {
            return { status: 400, message: "Email is taken" };
        }
    });
    return { status: 200, message: "Signup success! Please login." };
});
exports.registerService = registerService;
const addFavService = (userId, favId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findById(userId).catch((error) => {
        return { status: 400, message: "User id is not valid", error };
    });
    const fav = yield Movie.findById(favId).catch((error) => {
        return { status: 400, message: "Favorite id is not valid", error };
    });
    if (!user || !fav) {
        return { status: 400, message: "User or favorite does not exist" };
    }
    const favExists = user.favorites.find((favorite) => favorite === favId);
    if (favExists) {
        return { status: 400, message: "Favorite already exists" };
    }
    user.favorites.push(fav._id);
    yield user.save((error) => {
        if (error) {
            return { status: 400, message: "Error adding favorite", error };
        }
    });
    return { status: 200, message: "Favorite added" };
});
exports.addFavService = addFavService;
