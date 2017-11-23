var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var config = require('./config/dbconfig');

var index = require('./routes');
var countries = require('./routes/countries');

var app = express();

// view engine
var ejsEngine = require('ejs-locals');
app.engine("ejs", ejsEngine);
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "client")));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/", index);
app.use("/api", countries);

app.listen(config.port, function() {
    console.log('Server started on port ' + config.port);
});
