var routines = require('../controllers/routines.js'),
	expressJwt = require('express-jwt'), 
	authenticate = expressJwt({secret : 'server secret'}),
	jwt = require('jsonwebtoken'),
	cfg = require('./private.js'),
	helpers = require('./helpers.js');

module.exports = function(app,passport)
{

//jwtVerify = (function(req,res,callback){jwt.verify(req.body.token, cfg.jwtSecret, function(err,decoded){if(err){res.sendStatus(404);}else{callback();console.log(decoded);}})}())

//modeling routes:
	//verify jwt token:
	app.post('/test', function(req,res){
		//initiate jwt's verify, passing the token stored to be decoded, the secret, and callback
		jwt.verify(req.body.token, cfg.jwtSecret, function(err, decoded) {
			if(err){
				//token can't be decoded/verified
				res.sendStatus(404);
			}else{
				//decoded returns object with .id,.iat,.exp
				console.log(decoded);
				res.sendStatus(200);
			}
		})
	}),

//routes to passport.js
	//post to passport local-register to authenticate
	app.post('/registerUser', passport.authenticate('local-register', {session:false}),helpers.generateToken,helpers.respond),

	//post to passport local-login to authenticate
	app.post('/loginUser', passport.authenticate('local-login', {session:false}),helpers.generateToken,helpers.respond),

//routes to controller after verification
	app.post('/createRoutine', function(req,res){
		//initiate jwt's verify, passing the token stored to be decoded, the secret, and callback
		jwt.verify(req.headers.authorization, cfg.jwtSecret, function(err, decoded) {
			if(err){
				//token can't be decoded/verified
				res.sendStatus(404);
			}else{
				//decoded returns object with .id,.iat,.exp
				routines.createRoutine(req,res);
			}
		})
	}),
	
	app.get('/getRoutine/:routine_name', function(req,res){
		//initiate jwt's verify, passing the token stored to be decoded, the secret, and callback
		jwt.verify(req.headers.authorization, cfg.jwtSecret, function(err, decoded) {
			if(err){
				//token can't be decoded/verified
				res.sendStatus(404);
			}else{
				//decoded returns object with .id,.iat,.exp
				routines.getRoutine(req,res);
			}
		})
	}),

	app.get('/getAllRoutines',function(req,res){{
		//initiate jwt's verify, passing the token stored to be decoded, the secret, and callback
		jwt.verify(req.headers.authorization, cfg.jwtSecret, function(err, decoded) {
			if(err){
				//token can't be decoded/verified
				res.sendStatus(404);
			}else{
				//decoded returns object with .id,.iat,.exp
				routines.getAllRoutines(decoded.id,res);
			}
		})
	}}),

//no longer needed:
	app.post('/logOutUser',function(req,res){
		req.session.destroy(function(err){
	    	if(err){
	        	console.log(err);
	      	}else{
	        	res.sendStatus(200);
	      	}
	    })
	});
}

