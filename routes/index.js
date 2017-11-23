var express = require('express');
var router = express.Router();

router.get("/", function(req, res, err) {
    //res.send("INDEX Page");
    res.render("index", {title: "Population API"})
});

module.exports = router;
