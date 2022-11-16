import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import { MovieSchema } from "../schemas";
import { createMovieService, deleteMovieService, getMoviesService, updateMovieService } from "../services";

const getMovies = async (req: Request, res: Response) => {
    const directorId = req.params.id;
    const result = await getMoviesService(directorId).catch((error: MongooseError) => {
        return { status: 500, error };
    });
    res.status(result.status).send(result);
};

const createMovie = async (req: Request, res: Response) => {
    const { directorId, title, synopsis, coverURL, link } = req.body;

    const parseResult = MovieSchema.safeParse({ directorId, title, synopsis, coverURL, link });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error.message });
    }

    const result = await createMovieService(directorId, title, synopsis, coverURL, link).catch((error: MongooseError) => {
        return { status: 500, error };
    });
    res.status(result.status).send(result);
};

const updateMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { directorId, title, synopsis, coverURL, link } = req.body;

    const parseResult = MovieSchema.safeParse({ directorId, title, synopsis, coverURL, link });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error.message });
    }

    const result = await updateMovieService(id, parseResult.data).catch((error: MongooseError) => {
        return { status: 500, error };
    });
    res.status(result.status).send({ message: "Movie updated" });
};

const deleteMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteMovieService(id).catch((error: MongooseError) => {
        return { status: 500, error };
    });
    res.status(result.status).send({ message: "Movie deleted" });
};

export { getMovies, createMovie, updateMovie, deleteMovie };
