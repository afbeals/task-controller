var path = require("path");
var express = require("express");
var app = express();
var session = require("express-session");

var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./client")));

app.use(session({
                  secret: "MyNotSecureSecret",
                  saveUninitialized: true,
                  resave: false,
                  cookie: {
                            maxAge: 36000000,
                          }
                }));

require('./server/config/mongoose.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

// listen on 8000
app.listen(8000, function() {
 console.log("Stracker on port 8000!!");
})