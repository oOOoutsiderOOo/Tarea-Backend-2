import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import { DirectorSchema } from "../schemas";
import { updateDirectorDocument } from "../services/directors.service";
const Director = require("../models/director");

const getDirectors = async (req: Request, res: Response) => {
    const directors = await Director.find();
    res.status(200).send(directors);
};

const getDirector = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const director = await Director.findById(id);
        if (!director) {
            return res.status(404).send({ error: "Director not found" });
        }
        res.status(200).send(director);
    } catch (error) {
        res.status(500).send({ error });
    }
};

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
                error: error.message.startsWith("E11000") ? "Director already exists" : error.message,
            });
        }
        res.status(200).send({
            message: "Director created",
        });
    });
};

const updateDirector = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, bio, imageURL, movies } = req.body;

    const parseResult = DirectorSchema.safeParse({ name, bio, imageURL, movies });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error.message });
    }

    try {
        const director = await updateDirectorDocument(id, parseResult.data);
        if (!director) {
            return res.status(404).send({ error: "Director not found" });
        }
        res.status(200).send({
            message: "Director updated",
        });
    } catch (error) {
        res.status(500).send({ error });
    }
};

const deleteDirector = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const director = await Director.findByIdAndDelete(id);
        if (!director) {
            return res.status(404).send({ error: "Director not found" });
        }
        res.status(200).send({ message: "Director deleted" });
    } catch (error) {
        res.status(500).send({ error });
    }
};

export { getDirectors, getDirector, createDirector, updateDirector, deleteDirector };
