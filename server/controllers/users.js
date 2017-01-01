var mongoose = require('mongoose');
var Routine = mongoose.model('Routine');
var Task = mongoose.model('Task');
var User = mongoose.model('User');

module.exports =
{
	registerUser : function(req,res){
		console.log(req);
	    if(req.password === req.password_confirmation && req.email === req.email_confirmation){
	      var user = new User({	first_name: req.first_name, 
	      						last_name: req.last_name, 
	      						email: req.email, 
	      						username: req.username,
	      						home: req.home, 
	      						password: req.password});
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

	 loginUser : function (req,res)
  {

   User.findOne({username: req.username, password: req.password}, function(err,user)
    {
      if(err)
      {
        console.log(err);
      }
      else if(!user)
      {
        console.log("failed login");
      }
      else
      {
        console.log("found user");
         req.session.username = '1';
        console.log(req.session);
        res.end();
      }
    })
  }
}