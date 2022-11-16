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
exports.deleteMovieService = exports.updateMovieService = exports.createMovieService = exports.getMoviesService = void 0;
const directors_service_1 = require("./directors.service");
const Movie = require("../models/movie");
const Director = require("../models/director");
const getMoviesService = (directorId) => __awaiter(void 0, void 0, void 0, function* () {
    const director = yield Director.findById(directorId);
    if (!director) {
        return { status: 400, error: "Director not found" };
    }
    const movies = yield Movie.find({ directorId });
    if (movies.length === 0) {
        return { status: 400, error: `${director.name} has no movies in the app. Go ahead and add one!` };
    }
    return { status: 200, movies };
});
exports.getMoviesService = getMoviesService;
const createMovieService = (directorId, title, synopsis, coverURL, link) => __awaiter(void 0, void 0, void 0, function* () {
    const director = yield Director.findById(directorId);
    if (!director) {
        return { status: 400, error: "Director not found" };
    }
    const newMovie = new Movie({
        directorId,
        title,
        synopsis,
        coverURL,
        link,
    });
    newMovie.save((error) => {
        if (error) {
            return { status: 400, error: error.message.startsWith("E11000") ? "Movie already exists" : error.message };
        }
        return { status: 500, error };
    });
    (0, directors_service_1.updateDirectorDocument)(directorId, { movies: [...director.movies, newMovie._id] }).catch((error) => {
        return { status: 500, error };
    });
    return { status: 201, message: "Movie created" };
});
exports.createMovieService = createMovieService;
const updateMovieService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO - handle directorId change
    const movie = yield Movie.findByIdAndUpdate(id, data);
    if (!movie) {
        return { status: 404, error: "Movie not found" };
    }
    return { status: 200, message: "Movie updated" };
});
exports.updateMovieService = updateMovieService;
const deleteMovieService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = yield Movie.findByIdAndDelete(id);
    if (!movie) {
        return { status: 404, error: "Movie not found" };
    }
    return { status: 200, message: "Movie deleted" };
});
exports.deleteMovieService = deleteMovieService;
