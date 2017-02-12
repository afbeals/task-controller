var mongoose = require('mongoose'),
	localStrategy = require('passport-local').Strategy,
	Routine = mongoose.model('Routine'),
	Task = mongoose.model('Task'),
	users = require('../controllers/users.js');

	


module.exports = function(passport){
		//no session being set, currently unused
		passport.serializeUser(function(user,done){
			console.log('in serial',user);
			done(null, user);
		});

		//no session being set, currently unused
		passport.deserializeUser(function(id,done){
			User.findById(id, function(err,user){
				done(err, user);
			});
		});
		//use passport middleware to authenticate
		passport.use('local-register', new localStrategy({
			passReqToCallback: true
		}, function(req,username,password,done){
			//force async
			process.nextTick(function(){
				//make call to users controller
				users.registerUser(req,username,password,done);
			});
		}));

		passport.use('local-login', new localStrategy({
			passReqToCallback: true
		}, function(req,username,password,done){
			//force async
			process.nextTick(function(){
				//make call to users controller
				users.loginUser(req,username,password,done);
			});
		}));
}