import { Router } from "express";
import db from "../db";

const router = Router();

router.get("/dashboard", async (_, res) => {
  const { name } = res.locals;
  const data = await db.fetch({ name });
  res.render("dashboard", { name, data });
});

router.post("/login", (req, res) => {
  const { name } = req.body;
  res.cookie("name", name);
  res.redirect("/dashboard");
});

router.post("/logout", (_, res) => {
  res.clearCookie("name");
  res.redirect("/dashboard");
});

router.get("/ping", (_, res) => {
  res.send("pong");
});

export default router;
