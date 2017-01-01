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
		console.log(req[1]);
		// var routine = new Routine({routine_name: req.body.name, quote: req.body.quote});
	 //    quote.save(function(err) {
	 //      if(err){
	 //        console.log("something went wrong");
	 //      } else {
	 //        res.redirect('/main');
	 //      }
	 //    })
	}
}