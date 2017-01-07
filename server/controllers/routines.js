var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
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
		console.log(req.body);

		User.findOne({username: req.session.username},function(err,user){
			if(err){
				console.log("createRoutine err: ",err);
			}else{
//make adjustment in loop
				console.log("return ",req.session.username," user: ", user);
				var routineCheck = function(routine_name){
					var found = false;
					for(var l = 0;l<user._routine;++l){
						if(user._routine[l]==routine_name);
						found = true;
					}
					return found;
				}
				if(routineCheck(req.body.routine_name)){
					res.sendStatus(400);
				}else{
					var routine = new Routine({routine_name: req.body.routine_name, total_duration: req.body.total_duration,_username:user._id});
					//routine._username = req.session.username;
					routine.save(function(err,routine){
						if(err){
							console.log('routine save err: ',err);
						}else{
//update not pushing in routine, maybe use 'task._routine.push() method'
							user._routine.push(routine._id);
							user.save(function(err,user){
							//user.update({_id:user._id}, {$push:{_routine:routine._id}}, function(err){
								if(err){
									console.log('user save err: ',err);
								}else{
									var tasksIds = [];
									for(var x = 0;x<req.body.tasks.length;++x){
										var task = new Task({
																task_name: req.body.tasks[x].task_name,
																task_length:req.body.tasks[x].task_length,
																task_location:req.body.tasks[x].task_location,
																order:req.body.tasks[x].order,
																_username:user._id,
																_routine:routine._id
															});
										routine._task.push(task._id);
										user._task.push(task._id);
										tasksIds.push(task._id);
										console.log(tasksIds);
										task.save(function(err,task){
											if(err){
												console.log("task save err: ",err);
											}
										})
									}
									routine.save(function(err,routine){
										if(err){
											console.log("routine update err: ",err);
										}else{				
											user.save(function(err,user){
												if(err){
													console.log('user update err: ', err);
												}
											});
										}
									})																						
								}
							})
						}
					})
				}
			}
		})
		console.log('please done');
		res.sendStatus(200);
//move into for x for loop inside task.save else statment
// //routine update not pushing in task id's, maybe use 'task._routine.push() method'
// 												routine._task.push(task._id);
// 												routine.save(function(err,routine){
// 												//routine.update({_id:routine._id}, {$push:{_task:task._id}}, function(err){
// 													if(err){
// 														console.log("routine update err: ",err);
// 													}else{
// // user update not pushing task in to db				
// 														user._routine.push(task._id);
// 														user.save(function(err,user){
// 														user.update({_id:user._id}, {$push:{_task:task._id}}, function(err){
// 															if(err){
// 																console.log('user update err: ', err);
// 															}
// 														});
// 													}
// 												})


		// var ids = []; 
		// var routine = new Routine({routine_name: req.body.routine_name,total_duration:req.body.total_duration,_username:req.session.username});
		

		// var promise = User.findOne({username: req.session.username}).exec();

		// promise.then(function(user){
		// 	routine._username = user._id;
		// 	return routine.save();
		// }).then(function(routine){

		// })

		// var promise = Task.insertMany(req.body.tasks,function(err,docs)).exec();

		// promise.then(function(docs){
		// 	for(var x = 0;x<docs.length;++x){
	 //        		ids.push(docs[x]._id);
	 //        }

	 //        return
		// })

		// var promise = User.findOne({ username: req.session.username }).exe()

		// promise.then(function(user) {
		//   user.name = 'Robert Paulson';

		//   return user.save(); // returns a promise
		// })
		// .then(function(user) {
		//   console.log('updated user: ' + user.name);
		//   // do something with updated user
		// })
		// .catch(function(err){
		//   // just need one of these
		//   console.log('error:', err);
		// });
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