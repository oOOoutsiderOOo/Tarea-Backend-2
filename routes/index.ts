import { Express } from "express";
import { login, register } from "../controllers";
import { isAuth } from "../middlewares";

export function routes(app: Express) {
    app.get("/api", isAuth, (req, res) => {
        res.status(200).send("Hola");
    });

    app.post("/api/register", (req, res) => {
        register(req, res);
    });

    app.post("/api/login", (req, res) => {
        login(req, res);
    });
}