import { MongooseError } from "mongoose";
import { updateDirectorService } from "./directors.service";

const Movie = require("../models/movie");
const Director = require("../models/director");

export const getMoviesService = async (directorId: string) => {
    const director = await Director.findById(directorId);
    if (!director) {
        return { status: 400, error: "Director not found" };
    }

    const movies = await Movie.find({ directorId });
    if (movies.length === 0) {
        return { status: 400, error: `${director.name} has no movies in the app. Go ahead and add one!` };
    }

    return { status: 200, movies };
};

export const createMovieService = async (directorId: string, title: string, synopsis: string, coverURL: string, link: string) => {
    try {
        const director = await Director.findById(directorId);
        if (!director) {
            throw { status: 400, error: "Director ID is not valid" };
        }
        const newMovie = new Movie({
            directorId,
            title,
            synopsis,
            coverURL,
            link,
        });
        await newMovie.save().catch((error: MongooseError) => {
            throw { status: 400, error: error.message.startsWith("E11000") ? "Movie already exists" : error.message };
        });
        updateDirectorService(directorId, { movies: [...director.movies, newMovie._id] }).catch(error => {
            throw { status: 500, error };
        });
        return { status: 201, message: "Movie created" };
    } catch (error) {
        throw error;
    }
};

export const updateMovieService = async (id: string, data: any) => {
    //TODO - handle directorId change

    try {
        const movie = await Movie.findByIdAndUpdate(id, data).catch((error: MongooseError) => {
            throw { status: 500, error };
        });
        if (!movie) {
            throw { status: 404, error: "Movie not found" };
        }
        return { status: 200, message: "Movie updated" };
    } catch (error) {
        throw error;
    }
};

export const deleteMovieService = async (id: string) => {
    try {
        const movie = await Movie.findByIdAndDelete(id).catch((error: MongooseError) => {
            throw { status: 500, error };
        });
        if (!movie) {
            throw { status: 404, error: "Movie not found" };
        }
        return { status: 200, message: "Movie deleted" };
    } catch (error) {
        throw error;
    }
};
