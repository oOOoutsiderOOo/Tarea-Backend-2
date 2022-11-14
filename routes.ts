import { Express } from "express";

export function routes(app: Express) {
    app.get("/api", (req, res) => {
        res.status(200).send("Funciona");
    });
}
