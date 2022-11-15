import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import { DirectorSchema } from "../schemas";
const Director = require("../models/director");

const getDirectors = async (req: Request, res: Response) => {};

const getDirector = async (req: Request, res: Response) => {};

const createDirector = async (req: Request, res: Response) => {
    const { name, bio, imageURL, movies } = req.body;

    const parseResult = DirectorSchema.safeParse({ name, bio, imageURL, movies });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error.message });
    }

    const newDirector = new Director({
        name: parseResult.data.name,
        bio: parseResult.data.bio,
        imageURL: parseResult.data.imageURL,
        movies: parseResult.data.movies,
    });

    newDirector.save((error: MongooseError) => {
        if (error) {
            return res.status(400).send({
                error: "Director already exists",
            });
        }
        res.status(200).send({
            message: "Director created",
        });
    });
};

const updateDirector = async (req: Request, res: Response) => {};

const deleteDirector = async (req: Request, res: Response) => {};

export { getDirectors, getDirector, createDirector, updateDirector, deleteDirector };
