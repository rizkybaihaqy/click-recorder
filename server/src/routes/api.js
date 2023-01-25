import { Router } from "express";
import { check, validationResult } from "express-validator";
import db from "../db";

const router = Router();

router.post(
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

router.get("/get-all-click", async (_, res) => {
  const dbRes = await db.fetch();
  res.send({ ok: true, data: dbRes });
});

router.get("/ping", (_, res) => {
  res.send({ ok: true, data: "pong" });
});

export default router;
