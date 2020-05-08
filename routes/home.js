var Router = require("express").Router;
var router = Router();
router.get("/", function (req, res) {
    res.status(200);
    res.render("index", {
        title: "Main",
        isHome: true
    });
});
module.exports = router;
//# sourceMappingURL=home.js.map