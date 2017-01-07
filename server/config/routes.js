var tasks = require('../controllers/tasks.js');
var routines = require('../controllers/routines.js');
var users = require('../controllers/users.js');

module.exports = function(app)
{
	app.post('/addTaskToRoutine', function(req,res){
		routines.addToRoutine(req,res);
	}),
	app.post('/createRoutine', function(req,res){
		routines.createRoutine(req,res);
	}),
	app.post('/addAllTask', function(req,res){
		tasks.addAllTask(req);
		console.log("routes req: ",req);
		res.sendStatus(200);
	}),
	app.post('/registerUser',function(req,res){
		console.log(req);
		users.registerUser(req,res);
	}),
	app.post('/loginUser',function(req,res){
		users.loginUser(req,res);
	})
}