"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.createToken = void 0;
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const luxon_1 = require("luxon");
const createToken = (userId) => {
    const payload = {
        id: userId,
        iat: luxon_1.DateTime.local().toSeconds(),
        exp: luxon_1.DateTime.local().plus({ days: 14 }).toSeconds(),
    };
    return jwt_simple_1.default.encode(payload, process.env.JWT_SECRET);
};
exports.createToken = createToken;
const decodeToken = (token) => {
    let payload;
    try {
        payload = jwt_simple_1.default.decode(token, process.env.JWT_SECRET);
        if (payload.exp <= luxon_1.DateTime.local().toSeconds()) {
            return { status: 401, message: "Token expired" };
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.decodeToken = decodeToken;
