"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
function routes(app) {
    app.get("/api", middlewares_1.isAuth, (req, res) => {
        res.status(200).send("Hola");
    });
    /* *********USER********** */
    app.post("/api/register", controllers_1.register);
    app.post("/api/login", controllers_1.login);
    app.post("/api/addFavorite", middlewares_1.isAuth, controllers_1.addFav);
    /* *********DIRECTOR********** */
    app.get("/api/directors", middlewares_1.isAuth, controllers_1.getDirectors);
    app.get("/api/directors/:id", middlewares_1.isAuth, controllers_1.getDirector);
    app.post("/api/directors", middlewares_1.isAuth, controllers_1.createDirector);
    app.put("/api/directors/:id", middlewares_1.isAuth, controllers_1.updateDirector);
    app.delete("/api/directors/:id", middlewares_1.isAuth, controllers_1.deleteDirector);
    /* *********MOVIE********** */
    app.get("/api/movies/:id", middlewares_1.isAuth, controllers_1.getMovie);
    app.post("/api/movies", middlewares_1.isAuth, controllers_1.createMovie);
    app.put("/api/movies/:id", middlewares_1.isAuth, controllers_1.updateMovie);
    app.delete("/api/movies/:id", middlewares_1.isAuth, controllers_1.deleteMovie);
}
exports.routes = routes;
