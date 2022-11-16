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
const services_1 = require("../services");
const Director = require("../models/director");
const getDirectors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const directors = yield Director.find().catch((error) => {
        return res.status(500).send(error);
    });
    res.status(200).send(directors);
});
exports.getDirectors = getDirectors;
const getDirector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, services_1.getDirectorService)(id).catch(error => {
        return res.status(error.status || 500).send(error);
    });
    res.status(result.status).send(result.director);
});
exports.getDirector = getDirector;
const createDirector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, bio, imageURL, movies } = req.body;
    const parseResult = schemas_1.DirectorSchema.safeParse({ name, bio, imageURL, movies });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error });
    }
    const result = yield (0, services_1.createDirectorService)(parseResult.data).catch(error => {
        return res.status(error.status || 500).send(error);
    });
    res.status(result.status).send(result.message);
});
exports.createDirector = createDirector;
const updateDirector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, bio, imageURL, movies } = req.body;
    const parseResult = schemas_1.DirectorSchema.safeParse({ name, bio, imageURL, movies });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error });
    }
    const result = yield (0, services_1.updateDirectorService)(id, parseResult.data).catch(error => {
        return res.status(error.status || 500).send(error);
    });
    res.status(result.status).send(result.message);
});
exports.updateDirector = updateDirector;
const deleteDirector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, services_1.deleteDirectorService)(id).catch(error => {
        return res.status(error.status || 500).send(error);
    });
    res.status(result.status).send(result.message);
});
exports.deleteDirector = deleteDirector;
