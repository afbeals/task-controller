var mongoose = require('mongoose'),
	Routine = mongoose.model('Routine'),
	Task = mongoose.model('Task'),
	User = mongoose.model('User');

module.exports =
{
	createTask : function(req,res){
		console.log(req);
	},
	addAllTask : function(req,res){
		console.log('req: ',req.body);
		Task.insertMany(req.body,function(err, docs){
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

