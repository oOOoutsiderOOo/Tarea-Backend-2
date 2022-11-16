import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import { DirectorSchema } from "../schemas";
import { createDirectorService, deleteDirectorService, getDirectorService, updateDirectorService } from "../services";
const Director = require("../models/director");

const getDirectors = async (req: Request, res: Response) => {
    const directors = await Director.find().catch((error: MongooseError) => {
        return res.status(500).send(error);
    });
    res.status(200).send(directors);
};

const getDirector = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result: any = await getDirectorService(id).catch(error => {
        return res.status(error.status || 500).send(error);
    });
    res.status(result.status).send(result.director);
};

const createDirector = async (req: Request, res: Response) => {
    const { name, bio, imageURL, movies } = req.body;

    const parseResult = DirectorSchema.safeParse({ name, bio, imageURL, movies });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error });
    }
    const result: any = await createDirectorService(parseResult.data).catch(error => {
        return res.status(error.status || 500).send(error);
    });
    res.status(result.status).send(result.message);
};

const updateDirector = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, bio, imageURL, movies } = req.body;

    const parseResult = DirectorSchema.safeParse({ name, bio, imageURL, movies });
    if (!parseResult.success) {
        return res.status(400).send({ error: parseResult.error });
    }

    const result: any = await updateDirectorService(id, parseResult.data).catch(error => {
        return res.status(error.status || 500).send(error);
    });
    res.status(result.status).send(result.message);
};

const deleteDirector = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result: any = await deleteDirectorService(id).catch(error => {
        return res.status(error.status || 500).send(error);
    });
    res.status(result.status).send(result.message);
};

export { getDirectors, getDirector, createDirector, updateDirector, deleteDirector };
