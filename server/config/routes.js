var tasks = require('../controllers/tasks.js');
var routines = require('../controllers/routines.js');
var users = require('../controllers/users.js');

module.exports = function(app)
{
	app.post('/addTaskToRoutine', function(req,res){
		console.log(req.body.task_name);
	})
}