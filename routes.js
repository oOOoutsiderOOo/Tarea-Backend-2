"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
function routes(app) {
    app.get("/api", (req, res) => {
        res.status(200).send("Funciona");
    });
}
exports.routes = routes;
