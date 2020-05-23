import { Router } from "express";
const router = Router();
import { Course } from "../models/course";

router.get("/", (req, res) => {
  res.status(200);
  res.render("add", {
    title: "Add Course",
    isAdd: true
  });
});

router.post("/", async (req, res) => {
  const course = new Course(req.body.title, Number(req.body.price), req.body.img);
  await Course.save(course);
  res.redirect("/courses");
});

module.exports = router