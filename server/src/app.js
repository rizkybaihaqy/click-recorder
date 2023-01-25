import express from "express";
import cors from "cors";
import apiRouter from "./routes/api";
import webRouter from "./routes/web";

const app = express();

app.use("/", webRouter);
app.use("/api", cors({ origin: "*" }), express.json(), apiRouter);

export default app;
