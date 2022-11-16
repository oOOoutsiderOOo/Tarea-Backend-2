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
exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovies = void 0;
const schemas_1 = require("../schemas");
const services_1 = require("../services");
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const directorId = req.params.id;
    const result = yield (0, services_1.getMoviesService)(directorId).catch(error => {
        return { status: 500, error };
    });
    res.status(result.status).send(result);
});
exports.getMovies = getMovies;
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { directorId, title, synopsis, coverURL, link } = req.body;
    const parseResult = schemas_1.MovieSchema.safeParse({ directorId, title, synopsis, coverURL, link });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error });
    }
    const result = yield (0, services_1.createMovieService)(directorId, title, synopsis, coverURL, link).catch(error => {
        return res.status(error.status || 500).send(error);
    });
    res.status(result.status).send(result.message);
});
exports.createMovie = createMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { directorId, title, synopsis, coverURL, link } = req.body;
    const parseResult = schemas_1.MovieSchema.safeParse({ directorId, title, synopsis, coverURL, link });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error });
    }
    const result = yield (0, services_1.updateMovieService)(id, parseResult.data).catch(error => {
        return res.status(error.status || 500).send(error);
    });
    res.status(result.status).send(result.message);
});
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, services_1.deleteMovieService)(id).catch(error => {
        return res.status(error.status || 500).send(error);
    });
    res.status(result.status).send(result.message);
});
exports.deleteMovie = deleteMovie;
