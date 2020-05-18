import { Router } from "express";
const router = Router();

router.get("/", (req, res) => { 
  res.status(200);
  res.render("index", {
    title: "Main",
    isHome: true
  });
}); 

module.exports = router