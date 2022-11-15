"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
function routes(app) {
    app.get("/api", middlewares_1.isAuth, (req, res) => {
        res.status(200).send("Hola");
    });
    app.post("/api/register", controllers_1.register);
    app.post("/api/login", controllers_1.login);
}
exports.routes = routes;
