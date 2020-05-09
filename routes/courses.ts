import { Router } from "express";
import { Course } from "../models/course"
const router = Router();

router.get("/", async (req, res) => {
  const courses = await Course.getAllCourses();
  res.status(200);
  res.render("courses", {
    title: "Courses",
    isCourses: true,
    courses
  });
});

module.exports = router