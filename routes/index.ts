import { Express } from "express";
import {
    addFav,
    createDirector,
    createMovie,
    deleteDirector,
    deleteMovie,
    getDirector,
    getDirectors,
    getMovies,
    login,
    register,
    updateDirector,
    updateMovie,
} from "../controllers";
import { isAuth } from "../middlewares";

export function routes(app: Express) {
    app.get("/api", isAuth, (req, res) => {
        res.status(200).send("Hola");
    });

    /* *********USER********** */

    app.post("/api/register", register);
    app.post("/api/login", login);
    app.post("/api/addFavorite", isAuth, addFav);

    /* *********DIRECTOR********** */

    app.get("/api/directors", isAuth, getDirectors);
    app.get("/api/directors/:id", isAuth, getDirector);
    app.post("/api/directors", isAuth, createDirector);
    app.put("/api/directors/:id", isAuth, updateDirector);
    app.delete("/api/directors/:id", isAuth, deleteDirector);

    /* *********MOVIE********** */

    app.get("/api/movies/:id", isAuth, getMovies);
    app.post("/api/movies", isAuth, createMovie);
    app.put("/api/movies/:id", isAuth, updateMovie);
    app.delete("/api/movies/:id", isAuth, deleteMovie);
}
