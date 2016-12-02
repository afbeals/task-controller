var mongoose = require('mongoose');
var Routine = mongoose.model('Routine');
var Task = mongoose.model('Task');
var User = mongoose.model('User');

module.exports =
{
	addToRoutine : function(req,res){
		console.log(req.body);
		res.end();
	},
	createRoutine : function(req,res){
		console.log(req);
		
	}
}