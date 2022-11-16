import { MongooseError } from "mongoose";
import { updateDirectorDocument } from "./directors.service";

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
    const director = await Director.findById(directorId);
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

    newMovie.save((error: MongooseError) => {
        if (error) {
            return { status: 400, error: error.message.startsWith("E11000") ? "Movie already exists" : error.message };
        }
        return { status: 500, error };
    });
    updateDirectorDocument(directorId, { movies: [...director.movies, newMovie._id] }).catch((error: MongooseError) => {
        return { status: 500, error };
    });
    return { status: 201, message: "Movie created" };
};

export const updateMovieService = async (id: string, data: any) => {
    //TODO - handle directorId change

    const movie = await Movie.findByIdAndUpdate(id, data);
    if (!movie) {
        return { status: 404, error: "Movie not found" };
    }
    return { status: 200, message: "Movie updated" };
};

export const deleteMovieService = async (id: string) => {
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
        return { status: 404, error: "Movie not found" };
    }
    return { status: 200, message: "Movie deleted" };
};
