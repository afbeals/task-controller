var mongoose = require('mongoose');
var Routine = mongoose.model('Routine');
var Task = mongoose.model('Task');
var User = mongoose.model('User');

module.exports =
{
	createTask : function(req,res){
		console.log(req);
	},
	addAllTask : function(req,res){
		console.log('req: ',req);
		Task.insertMany(req,function(err, docs){
			if(err)
	        {
	          console.log("my err: ",err);
	        }else{
	        	for(var x = 0;x<docs.length;++x){
	        		console.log(docs[x]._id);
	        	}
	        }
		});
	}
}

