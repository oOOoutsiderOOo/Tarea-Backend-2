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
exports.deleteDirectorService = exports.createDirectorService = exports.getDirectorService = exports.deleteMovieFromArray = exports.updateDirectorDocument = void 0;
const Director = require("../models/director");
const updateDirectorDocument = (id, newData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, bio, imageURL, movies } = newData;
    const director = yield Director.findByIdAndUpdate(id, {
        name: name,
        bio: bio,
        imageURL: imageURL,
        movies: movies,
    });
    if (!director) {
        return { status: 404, error: "Director not found" };
    }
    return { status: 200, message: "Director updated" };
});
exports.updateDirectorDocument = updateDirectorDocument;
const deleteMovieFromArray = (id, movieId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Director.findByIdAndUpdate(id, {
        $pull: { movies: movieId },
    });
});
exports.deleteMovieFromArray = deleteMovieFromArray;
const getDirectorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const director = yield Director.findById(id);
    if (!director) {
        return { status: 400, error: "Director not found" };
    }
    return director;
});
exports.getDirectorService = getDirectorService;
const createDirectorService = (newDirectorData) => __awaiter(void 0, void 0, void 0, function* () {
    const director = new Director({
        name: newDirectorData.name,
        bio: newDirectorData.bio,
        imageURL: newDirectorData.imageURL,
        movies: newDirectorData.movies,
    });
    yield director.save((error) => {
        if (error) {
            return { status: 400, error: error.message.startsWith("E11000") ? "Director already exists" : error.message };
        }
    });
    return { status: 201, message: "Director created" };
});
exports.createDirectorService = createDirectorService;
const deleteDirectorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const director = yield Director.findByIdAndDelete(id);
    if (!director) {
        return { status: 404, error: "Director not found" };
    }
    return { status: 200, message: "Director deleted" };
});
exports.deleteDirectorService = deleteDirectorService;
