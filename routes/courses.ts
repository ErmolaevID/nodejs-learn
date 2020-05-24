import { Router } from "express";
import { Course } from "../models/course";
import { Card } from "../models/card";
const router = Router();

router.get("/", async (req, res) => {
  const courses = await Course.getAllCourses();
  res.status(200);
  res.render("courses", {
    title: "Courses",
    isCourses: true,
    courses
  })
})
router.get("/:id", async (req, res) => {
  const course = await Course.getCourseById(req.params.id);
  res.render("course", {
    layout: "empty",
    title: course.title,
    price: course.price,
    course
  })
})
router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  const course = await Course.getCourseById(req.params.id);
  res.render("course-edit", {
    title: course.title,
    price: course.price,
    img: course.img,
    course
  })
})
router.post("/edit", async (req, res) => {
  await Course.updateCourseById(req.body);
  await Card.updateCardCourses(req.body);
  res.redirect("/courses");
})

module.exports = router