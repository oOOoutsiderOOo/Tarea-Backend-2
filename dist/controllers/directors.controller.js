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
exports.deleteDirector = exports.updateDirector = exports.createDirector = exports.getDirector = exports.getDirectors = void 0;
const schemas_1 = require("../schemas");
const Director = require("../models/director");
const getDirectors = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getDirectors = getDirectors;
const getDirector = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getDirector = getDirector;
const createDirector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, bio, imageURL, movies } = req.body;
    const parseResult = schemas_1.DirectorSchema.safeParse({ name, bio, imageURL, movies });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error.message });
    }
    const newDirector = new Director({
        name: parseResult.data.name,
        bio: parseResult.data.bio,
        imageURL: parseResult.data.imageURL,
        movies: parseResult.data.movies,
    });
    newDirector.save((error) => {
        if (error) {
            return res.status(400).send({
                error: "Director already exists",
            });
        }
        res.status(200).send({
            message: "Director created",
        });
    });
});
exports.createDirector = createDirector;
const updateDirector = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateDirector = updateDirector;
const deleteDirector = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteDirector = deleteDirector;
