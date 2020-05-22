import { Router } from "express";
import { Card } from "../models/card";
import { Course } from "../models/course"
const router = Router();

router.post("/add", async (req, res) => {
  const course = await Course.getCourseById(req.body.id);
  await Card.addCourseInCard(course);
  res.redirect("/card");
})
router.get("/", async (req, res) => {
  const card = await Card.fetch();
  res.render("card", {
    title: "Card",
    isCard: true,
    courses: card.courses,
    price: card.price,
  })
})

module.exports = router;