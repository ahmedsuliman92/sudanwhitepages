var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(cookieParser());

var rest = require("./api");
var api = new rest(app);

var port = 80;

app.listen(port);

console.log("Server running on port " + port);
