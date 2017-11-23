var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var config = require('../config/dbconfig');

var db = mongojs(config.database, ['countries']);

router.get("/countries", function(req, res, err) {
    db.countries.find(function(err, data) {
        if (err) res.send(err);
        res.json(data);
    });
});

router.get("/countries/:id", function(req, res, next) {
    db.countries.findOne({_id: mongojs.ObjectId(req.params.id)},
    function(err, data){
        if (err) res.send(err);
        res.json(data);
    });
});

// create country
router.post("/countries", function(req, res, next) {
    var country = req.body;

    if (!country.country || !country.population)  {
        res.status(400);
        res.json(
            {"error": "Bad data, could not be inserted into the database."}
        )
    } else {
        db.countries.save(country, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        })
    }
});

// delete country
router.delete("/countries/:id", function(req, res, next) {
    db.countries.remove({_id: mongojs.ObjectId(req.params.id)},
    function(err, data){
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
});

// update country
router.put("/countries/:id", function(req, res, next) {
    var country = req.body;
    var changedCountry = {};

    if (country.country) {
        changedCountry.country = country.country;
    }

    if (country.population) {
        changedCountry.population = country.population;
    }

    if (!changedCountry) {
        res.status(400);
        res.json(
            {"error": "Bad Data"}
        )
    } else {
        db.countries.update({_id: mongojs.ObjectId(req.params.id)}, changedCountry,{},
        function(err, data){
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    }
});

module.exports = router;
