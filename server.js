var path = require("path");
var express = require("express");
var app = express();
//var session = require("express-session");
var jwt = require('jsonwebtoken');
var passport = require('passport');
//var passportJwt = require('passport-jwt');

var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./client")));
require('./server/config/mongoose.js');
require('./server/config/passport.js')(passport);
app.use(passport.initialize());

//session no longer being created
// app.use(session({
//                   secret: "MyNotSecureSecret",
//                   saveUninitialized: true,
//                   resave: false,
//                   cookie: {
//                             maxAge: 36000000,
//                           }
//                 }));





var routes_setter = require('./server/config/routes.js');
routes_setter(app,passport);
app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('/client/index.html', { root: __dirname });
});
// listen on 8000
app.listen(8000, function() {
 console.log("TCommander on port 8000!!");
})