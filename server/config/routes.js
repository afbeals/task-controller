var tasks = require('../controllers/tasks.js');
var routines = require('../controllers/routines.js');
var users = require('../controllers/users.js');

module.exports = function(app)
{
	app.post('/createRoutine', function(req,res){
		routines.createRoutine(req,res);
	}),
	app.post('/registerUser',function(req,res){
		users.registerUser(req,res);
	}),
	app.post('/loginUser',function(req,res){
		users.loginUser(req,res);
	}),
	app.get('/getRoutine/:routine_name', function(req,res){
		routines.getRoutine(req,res);
	}),
	app.get('/getAllRoutines',function(req,res){{
		routines.getAllRoutines(req,res);
	}})
}