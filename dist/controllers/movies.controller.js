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
const directors_service_1 = require("../services/directors.service");
const Movie = require("../models/movie");
const Director = require("../models/director");
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const directorId = req.params.id;
    try {
        const director = yield Director.findById(directorId);
        if (!director) {
            return res.status(404).send({ error: "Director not found" });
        }
        const movies = yield Movie.find({ directorId });
        if (movies.length === 0) {
            return res.status(404).send({ error: `${director.name} has no movies in the app. Go ahead and add one!` });
        }
        res.status(200).send(movies);
    }
    catch (error) {
        res.status(500).send({ error });
    }
});
exports.getMovies = getMovies;
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { directorId, title, synopsis, coverURL, link } = req.body;
    const parseResult = schemas_1.MovieSchema.safeParse({ directorId, title, synopsis, coverURL, link });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error.message });
    }
    try {
        const checkedDirector = yield Director.findById(directorId);
        if (!checkedDirector) {
            return res.status(404).send({ error: "Director not found" });
        }
        const newMovie = new Movie({
            directorId: parseResult.data.directorId,
            title: parseResult.data.title,
            synopsis: parseResult.data.synopsis,
            coverURL: parseResult.data.coverURL,
            link: parseResult.data.link,
        });
        newMovie.save((error) => {
            if (error) {
                return res.status(400).send({
                    error: error.message.startsWith("E11000") ? "Movie already exists" : error.message,
                });
            }
            (0, directors_service_1.updateDirectorDocument)(directorId, { movies: [...checkedDirector.movies, newMovie._id] })
                .then(() => {
                res.status(200).send({
                    message: "Movie created",
                });
            })
                .catch((error) => {
                return res.status(500).send({ error });
            });
        });
    }
    catch (error) {
        res.status(500).send({ error });
    }
});
exports.createMovie = createMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteMovie = deleteMovie;
