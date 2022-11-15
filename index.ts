import express from "express";
import { routes } from "./routes";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string, () => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`⚡️ Stones rolling on port ${port} ⚡️`));
});

routes(app);
