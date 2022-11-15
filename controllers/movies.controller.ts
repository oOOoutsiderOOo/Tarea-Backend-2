import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import { MovieSchema } from "../schemas";
import { deleteMovieFromArray, updateDirectorDocument } from "../services/directors.service";
const Movie = require("../models/movie");
const Director = require("../models/director");

const getMovies = async (req: Request, res: Response) => {
    const directorId = req.params.id;
    try {
        const director = await Director.findById(directorId);
        if (!director) {
            return res.status(404).send({ error: "Director not found" });
        }

        const movies = await Movie.find({ directorId });
        if (movies.length === 0) {
            return res.status(404).send({ error: `${director.name} has no movies in the app. Go ahead and add one!` });
        }
        res.status(200).send(movies);
    } catch (error) {
        res.status(500).send({ error });
    }
};

const createMovie = async (req: Request, res: Response) => {
    const { directorId, title, synopsis, coverURL, link } = req.body;

    const parseResult = MovieSchema.safeParse({ directorId, title, synopsis, coverURL, link });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error.message });
    }
    try {
        const checkedDirector = await Director.findById(directorId);
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

        newMovie.save((error: MongooseError) => {
            if (error) {
                return res.status(400).send({
                    error: error.message.startsWith("E11000") ? "Movie already exists" : error.message,
                });
            }
            updateDirectorDocument(directorId, { movies: [...checkedDirector.movies, newMovie._id] })
                .then(() => {
                    res.status(201).send({
                        message: "Movie created",
                    });
                })
                .catch((error: MongooseError) => {
                    return res.status(500).send({ error });
                });
        });
    } catch (error) {
        res.status(500).send({ error });
    }
};

const updateMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { directorId, title, synopsis, coverURL, link } = req.body;

    const parseResult = MovieSchema.safeParse({ directorId, title, synopsis, coverURL, link });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error.message });
    }

    try {
        const movie = await Movie.findByIdAndUpdate(id, parseResult.data);
        if (!movie) {
            return res.status(404).send({ error: "Movie not found" });
        }
        res.status(200).send({ message: "Movie updated" });
    } catch (error) {
        res.status(500).send({ error });
    }
};

const deleteMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) {
            return res.status(404).send({ error: "Movie not found" });
        }
        deleteMovieFromArray(movie.directorId, id)
            .then(() => {
                res.status(200).send({ message: "Movie deleted" });
            })
            .catch((error: MongooseError) => {
                return res.status(500).send({ error });
            });
    } catch (error) {
        res.status(500).send({ error });
    }
};

export { getMovies, createMovie, updateMovie, deleteMovie };
