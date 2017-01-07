var mongoose = require('mongoose');
var Routine = mongoose.model('Routine');
var Task = mongoose.model('Task');
var User = mongoose.model('User');

module.exports =
{
	registerUser : function(req,res){
		console.log(req);
	    if(req.body.password === req.body.password_confirmation && req.body.email === req.body.email_confirmation){
	      var user = new User({	first_name: req.body.first_name, 
	      						last_name: req.body.last_name, 
	      						email: req.body.email, 
	      						username: req.body.username,
	      						home: req.body.home, 
	      						password: req.body.password});
	      user.save(function(err){
	        if(err){
	          console.log(err);
	        }else{
	          res.sendStatus(200);
	          res.end();
	        }
	      })
	    }else{
	      res.sendStatus(400);
	      console.log("mi eror")
		}
	},

	loginUser : function (req,res){
		User.findOne({username: req.body.username, password: req.body.password}, function(err,user){
			if(err){
				console.log(err);
			}else if(!user){
				console.log("failed login");
			}else{
				console.log("found user");
				req.session.username = user.username;
				req.session.first_name = user.first_name;
				res.json(user);

				// res.sendStatus(200)
				// res.end();
			}
		})
	}
}