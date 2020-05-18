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
router.get("/:id", async (req, res) => {
  const course = await Course.getCourseById(req.params.id);
  res.render("course", {
    layout: "empty",
    title: course.title,
    price: course.price,
    course
  });
});

module.exports = router