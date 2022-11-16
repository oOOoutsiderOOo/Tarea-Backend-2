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
exports.deleteDirectorService = exports.createDirectorService = exports.getDirectorService = exports.deleteMovieFromArray = exports.updateDirectorService = void 0;
const Director = require("../models/director");
const updateDirectorService = (id, newData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, bio, imageURL, movies } = newData;
    try {
        const director = yield Director.findByIdAndUpdate(id, {
            name: name,
            bio: bio,
            imageURL: imageURL,
            movies: movies,
        }).catch((error) => {
            throw { status: 500, error };
        });
        if (!director) {
            throw { status: 400, error: "Director not found" };
        }
        return { status: 200, message: "Director updated" };
    }
    catch (error) {
        throw error;
    }
});
exports.updateDirectorService = updateDirectorService;
const deleteMovieFromArray = (id, movieId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Director.findByIdAndUpdate(id, {
        $pull: { movies: movieId },
    });
});
exports.deleteMovieFromArray = deleteMovieFromArray;
const getDirectorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const director = yield Director.findById(id).catch((error) => {
            throw { status: 500, error };
        });
        if (!director) {
            throw { status: 400, error: "Director not found" };
        }
        return { status: 200, message: "Director found", director };
    }
    catch (error) {
        throw error;
    }
});
exports.getDirectorService = getDirectorService;
const createDirectorService = (newDirectorData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const director = new Director({
            name: newDirectorData.name,
            bio: newDirectorData.bio,
            imageURL: newDirectorData.imageURL,
            movies: newDirectorData.movies,
        });
        yield director.save().catch((error) => {
            throw { status: 400, error: error.message.startsWith("E11000") ? "Director already exists" : error.message };
        });
        return { status: 201, message: "Director created" };
    }
    catch (error) {
        throw error;
    }
});
exports.createDirectorService = createDirectorService;
const deleteDirectorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const director = yield Director.findByIdAndDelete(id).catch((error) => {
            throw { status: 500, error: error.message };
        });
        if (!director) {
            throw { status: 400, error: "Director not found" };
        }
        return { status: 200, message: "Director deleted" };
    }
    catch (error) {
        throw error;
    }
});
exports.deleteDirectorService = deleteDirectorService;
