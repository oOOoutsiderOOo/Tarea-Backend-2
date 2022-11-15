"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
function routes(app) {
    app.get("/api", middlewares_1.isAuth, (req, res) => {
        res.status(200).send("Hola");
    });
    app.post("/api/register", (req, res) => {
        (0, controllers_1.register)(req, res);
    });
    app.post("/api/login", (req, res) => {
        (0, controllers_1.login)(req, res);
    });
}
exports.routes = routes;
