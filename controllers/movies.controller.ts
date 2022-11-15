import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import { MovieSchema } from "../schemas";
const Movie = require("../models/movie");
const Director = require("../models/director");

const getMovies = async (req: Request, res: Response) => {};

const getMovie = async (req: Request, res: Response) => {};

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
            res.status(200).send({
                message: "Movie created",
            });
        });
    } catch (error) {
        res.status(500).send({ error });
    }
};

const updateMovie = async (req: Request, res: Response) => {};

const deleteMovie = async (req: Request, res: Response) => {};

export { getMovies, getMovie, createMovie, updateMovie, deleteMovie };
