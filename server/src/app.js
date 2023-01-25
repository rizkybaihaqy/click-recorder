import cookieParser from "cookie-parser";
import cors from "cors";
import * as Eta from "eta";
import express from "express";
import morgan from "morgan";
import path from "path";
import apiRouter from "./routes/api";
import webRouter from "./routes/web";

const app = express();

app.set("view engine", "eta");
app.engine("eta", Eta.renderFile);
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));

app.use(
  "/",
  cookieParser(),
  express.urlencoded({ extended: true }),
  (req, res, next) => {
    const { name = '' } = req.cookies;
    res.locals = { name, ...res.locals };
    next();
  },
  webRouter
);
app.use(
  "/api",
  cors({ origin: "*" }),
  express.json(),
  apiRouter
);

export default app;
