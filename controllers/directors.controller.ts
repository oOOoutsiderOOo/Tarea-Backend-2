import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import { DirectorSchema } from "../schemas";
import { createDirectorService, deleteDirectorService, getDirectorService, updateDirectorDocument } from "../services";
const Director = require("../models/director");

const getDirectors = async (req: Request, res: Response) => {
    const directors = await Director.find().catch((error: MongooseError) => {
        res.status(500).send({ error });
    });
    res.status(200).send(directors);
};

const getDirector = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getDirectorService(id).catch((error: MongooseError) => {
        res.status(500).send({ error });
    });
    res.send(result);
};

const createDirector = async (req: Request, res: Response) => {
    const { name, bio, imageURL, movies } = req.body;

    const parseResult = DirectorSchema.safeParse({ name, bio, imageURL, movies });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error.message });
    }
    const result = await createDirectorService(parseResult.data).catch((error: MongooseError) => {
        res.status(500).send({ error });
    });
    res.status(201).send(result);
};

const updateDirector = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, bio, imageURL, movies } = req.body;

    const parseResult = DirectorSchema.safeParse({ name, bio, imageURL, movies });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error.message });
    }

    const result = await updateDirectorDocument(id, parseResult.data).catch((error: MongooseError) => {
        res.status(500).send({ error });
    });
    result && res.status(result.status).send(result);
};

const deleteDirector = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteDirectorService(id).catch((error: MongooseError) => {
        res.status(500).send({ error });
    });
    res.status(200).send(result);
};

export { getDirectors, getDirector, createDirector, updateDirector, deleteDirector };
