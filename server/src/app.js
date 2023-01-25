import express from "express";
import cors from "cors";
import db from "./db";
import { check, validationResult } from "express-validator";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/ping", (_, res) => {
  res.send("pong");
});

app.post(
  "/save-click",
  [check("x").isNumeric(), check("y").isNumeric(), check("name").isString()],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { x, y, name } = req.body;
    const data = { name, point: { x, y } };
    await db.put(data);
    res.send({ ok: true });
  }
);

app.get("/get-all-click", async (_, res) => {
  const dbRes = await db.fetch();
  res.send({ ok: true, data: dbRes });
});

export default app;
