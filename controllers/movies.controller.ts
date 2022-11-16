import { Request, Response } from "express";
import { MovieSchema } from "../schemas";
import { createMovieService, deleteMovieService, getMoviesService, updateMovieService } from "../services";

const getMovies = async (req: Request, res: Response) => {
    const directorId = req.params.id;
    const result = await getMoviesService(directorId).catch(error => {
        return { status: 500, error };
    });
    res.status(result.status).send(result);
};

const createMovie = async (req: Request, res: Response) => {
    const { directorId, title, synopsis, coverURL, link } = req.body;

    const parseResult = MovieSchema.safeParse({ directorId, title, synopsis, coverURL, link });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error });
    }

    const result: any = await createMovieService(directorId, title, synopsis, coverURL, link).catch(error => {
        return res.status(error.status || 500).send(error);
    });
    res.status(result.status).send(result.message);
};

const updateMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { directorId, title, synopsis, coverURL, link } = req.body;

    const parseResult = MovieSchema.safeParse({ directorId, title, synopsis, coverURL, link });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error });
    }

    const result: any = await updateMovieService(id, parseResult.data).catch(error => {
        return res.status(error.status || 500).send(error);
    });
    res.status(result.status).send(result.message);
};

const deleteMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result: any = await deleteMovieService(id).catch(error => {
        return res.status(error.status || 500).send(error);
    });
    res.status(result.status).send(result.message);
};

export { getMovies, createMovie, updateMovie, deleteMovie };
