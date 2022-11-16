import { MongooseError } from "mongoose";
const Director = require("../models/director");

type newData = {
    name?: string;
    bio?: string;
    imageURL?: string;
    movies?: string[];
};

export const updateDirectorService = async (id: string, newData: newData) => {
    const { name, bio, imageURL, movies } = newData;
    try {
        const director = await Director.findByIdAndUpdate(id, {
            name: name,
            bio: bio,
            imageURL: imageURL,
            movies: movies,
        }).catch((error: MongooseError) => {
            throw { status: 500, error };
        });
        if (!director) {
            throw { status: 400, error: "Director not found" };
        }
        return { status: 200, message: "Director updated" };
    } catch (error) {
        throw error;
    }
};

export const deleteMovieFromArray = async (id: string, movieId: string) => {
    return await Director.findByIdAndUpdate(id, {
        $pull: { movies: movieId },
    });
};

export const getDirectorService = async (id: string) => {
    try {
        const director = await Director.findById(id).catch((error: MongooseError) => {
            throw { status: 500, error };
        });
        if (!director) {
            throw { status: 400, error: "Director not found" };
        }
        return { status: 200, message: "Director found", director };
    } catch (error) {
        throw error;
    }
};

export const createDirectorService = async (newDirectorData: any) => {
    try {
        const director = new Director({
            name: newDirectorData.name,
            bio: newDirectorData.bio,
            imageURL: newDirectorData.imageURL,
            movies: newDirectorData.movies,
        });
        await director.save().catch((error: MongooseError) => {
            throw { status: 400, error: error.message.startsWith("E11000") ? "Director already exists" : error.message };
        });
        return { status: 201, message: "Director created" };
    } catch (error) {
        throw error;
    }
};

export const deleteDirectorService = async (id: string) => {
    try {
        const director = await Director.findByIdAndDelete(id).catch((error: MongooseError) => {
            throw { status: 500, error: error.message };
        });
        if (!director) {
            throw { status: 400, error: "Director not found" };
        }
        return { status: 200, message: "Director deleted" };
    } catch (error) {
        throw error;
    }
};
