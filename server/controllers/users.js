var mongoose = require('mongoose');
var Routine = mongoose.model('Routine');
var Task = mongoose.model('Task');
var User = mongoose.model('User');

module.exports =
{
	loginUser : function (req,username,password,done){
		User.findOne({username:username, password: password},function(err,user){
			if(err){
				 return done(err);
			}else if(!user){
				return done(null, false,{ message: 'failed login, user not found.' });
			}else{
				return done(null, {user_id: user.id, first_name: user.first_name, home: user.home, email: user.email});
			}
		})
	},

	registerUser : function (req,username,password,done){
		if(req.body.password === req.body.password_confirmation && req.body.email === req.body.email_confirmation){
	      var user = new User({	first_name: req.body.first_name, 
	      						last_name: req.body.last_name, 
	      						email: req.body.email, 
	      						username: req.body.username,
	      						home: req.body.home, 
	      						password: req.body.password});
	      user.save(function(err){
	        if(err){
	          return done(err);
	        }else{
	          return done(null, {user_id: user.id, first_name: user.first_name, home: user.home, email: user.email});
	        }
	      })
	    }else{
	      return done(null, false,{ message: 'password or usernames do not match for registration' });
		}
	}
}