var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(cookieParser());

var rest = require("./api");
var api = new rest(app);

var port = 3000;

///app.listen(port);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

//console.log("Server running on port " + port);
