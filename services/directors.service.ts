import { MongooseError } from "mongoose";
const Director = require("../models/director");

type newData = {
    name?: string;
    bio?: string;
    imageURL?: string;
    movies?: string[];
};

export const updateDirectorDocument = async (id: string, newData: newData) => {
    const { name, bio, imageURL, movies } = newData;
    const director = await Director.findByIdAndUpdate(id, {
        name: name,
        bio: bio,
        imageURL: imageURL,
        movies: movies,
    });
    if (!director) {
        return { status: 404, error: "Director not found" };
    }
    return { status: 200, message: "Director updated" };
};

export const deleteMovieFromArray = async (id: string, movieId: string) => {
    return await Director.findByIdAndUpdate(id, {
        $pull: { movies: movieId },
    });
};

export const getDirectorService = async (id: string) => {
    const director = await Director.findById(id);
    if (!director) {
        return { status: 400, error: "Director not found" };
    }
    return director;
};

export const createDirectorService = async (newDirectorData: any) => {
    const director = new Director({
        name: newDirectorData.name,
        bio: newDirectorData.bio,
        imageURL: newDirectorData.imageURL,
        movies: newDirectorData.movies,
    });
    await director.save((error: MongooseError) => {
        if (error) {
            return { status: 400, error: error.message.startsWith("E11000") ? "Director already exists" : error.message };
        }
    });
    return { status: 201, message: "Director created" };
};

export const deleteDirectorService = async (id: string) => {
    const director = await Director.findByIdAndDelete(id);
    if (!director) {
        return { status: 404, error: "Director not found" };
    }
    return { status: 200, message: "Director deleted" };
};
