import express from "express";
import { routes } from "./routes";

const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => console.log(`Stones rolling on port ${port}`));

routes(app);
