import express from "express";
import cors from "cors";
import morgan from "morgan";
import apiRouter from "./routes/api";
import webRouter from "./routes/web";

const app = express();

app.use(morgan("dev"));

app.use("/", webRouter);
app.use("/api", cors({ origin: "*" }), express.json(), apiRouter);

export default app;
