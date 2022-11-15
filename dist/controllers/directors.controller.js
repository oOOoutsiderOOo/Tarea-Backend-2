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
const directors_service_1 = require("../services/directors.service");
const Director = require("../models/director");
const getDirectors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const directors = yield Director.find();
    res.status(200).send(directors);
});
exports.getDirectors = getDirectors;
const getDirector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const director = yield Director.findById(id);
        if (!director) {
            return res.status(404).send({ error: "Director not found" });
        }
        res.status(200).send(director);
    }
    catch (error) {
        res.status(500).send({ error });
    }
});
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
                error: error.message.startsWith("E11000") ? "Director already exists" : error.message,
            });
        }
        res.status(201).send({
            message: "Director created",
        });
    });
});
exports.createDirector = createDirector;
const updateDirector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, bio, imageURL, movies } = req.body;
    const parseResult = schemas_1.DirectorSchema.safeParse({ name, bio, imageURL, movies });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error.message });
    }
    try {
        const director = yield (0, directors_service_1.updateDirectorDocument)(id, parseResult.data);
        if (!director) {
            return res.status(404).send({ error: "Director not found" });
        }
        res.status(200).send({
            message: "Director updated",
        });
    }
    catch (error) {
        res.status(500).send({ error });
    }
});
exports.updateDirector = updateDirector;
const deleteDirector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const director = yield Director.findByIdAndDelete(id);
        if (!director) {
            return res.status(404).send({ error: "Director not found" });
        }
        res.status(200).send({ message: "Director deleted" });
    }
    catch (error) {
        res.status(500).send({ error });
    }
});
exports.deleteDirector = deleteDirector;
