var jwt = require('jsonwebtoken'),
	cfg = require('./private.js');

//helper functions that don't need to be modulated
module.exports =
{
	generateToken : function(req,res,done){
		req.token = jwt.sign({id:req.user.user_id},cfg.jwtSecret,{expiresIn: '1h'});
		done();
	},

	respond: function(req, res) {  
	  res.status(200).json({
	    token: req.token,
	    user: req.user
	  });
	}
}