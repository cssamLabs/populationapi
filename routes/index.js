var express = require('express');
var router = express.Router();

router.get("/", function(req, res, err) {
    //res.send("INDEX Page");
    res.render("index", {title: "College API"})
});

module.exports = router;
