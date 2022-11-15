const Director = require("../models/director");

type newData = {
    name?: string;
    bio?: string;
    imageURL?: string;
    movies?: string[];
};

export const updateDirectorDocument = async (id: string, newData: newData) => {
    const { name, bio, imageURL, movies } = newData;
    return await Director.findByIdAndUpdate(id, {
        name: name,
        bio: bio,
        imageURL: imageURL,
        movies: movies,
    });
};

export const deleteMovieFromArray = async (id: string, movieId: string) => {
    return await Director.findByIdAndUpdate(id, {
        $pull: { movies: movieId },
    });
};
