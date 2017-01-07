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
	})
}