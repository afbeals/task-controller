var mongoose = require('mongoose'),
	Routine = mongoose.model('Routine'),
	Task = mongoose.model('Task'),
	User = mongoose.model('User');
mongoose.Promise = require('bluebird');

module.exports =
{
	createRoutine : function(req,res){
		console.log(req.body)
		//find user to gain access to 'user' variable
		User.findOne({username: req.body._username},function(err,user){
			if(err){
				console.log("createRoutine User.findOne err: ",err);
				res.sendStatus(400);
				
			}else{
				//check if routine name already exist in 'user' _routine
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
					//create new Routine instance, assigning values to model defined keys; using req info and 'user' info
					var routine = new Routine({routine_name: req.body.routine_name, total_duration: req.body.total_duration,_username:user._id});
					//save new Routine instance to gain access to 'routine' variable
					routine.save(function(err,routine){
						if(err){
							console.log('createRoutine routine.save err: ',err);
							res.sendStatus(400);
							
						}else{
							//push 'routine' created id in 'user' _routine foreign key
							user._routine.push(routine._id);
							//save new 'user' with newly created id
							user.save(function(err,user){
								if(err){
									console.log('createRoutine user.save err: ',err);
									res.sendStatus(400);
									
								}else{
									//store all task ids in array to be pushed into 'user' and 'routine'
									var tasksIds = [];
									//create new Task instance for each task and push id into routine and user (will work mostly for smaller routines, larger will need to be reformated to use bluebird instead)
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
										//save each task
										task.save(function(err,task){
											if(err){
												console.log("createRoutine task.save err: ",err);
												res.sendStatus(400);
												
											}
										})
									}
									routine.save(function(err,routine){
										if(err){
											console.log("createRoutine routine.save 2 err: ",err);
											res.sendStatus(400);
											
										}else{				
											user.save(function(err,user){
												if(err){
													console.log('createRoutine user.save 2 err: ', err);
													res.sendStatus(400);
													
												}else{
													res.sendStatus(200);
													
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
	},

	getRoutine : function(req,res){
		Routine.findOne({routine_name: req.params.routine_name},function(err,routine){
			if(err){
				console.log("Routines getRoutine err: ", err);
				res.sendStatus(400);
				
			}else{
				res.json(routine);
			}
		});
	},

	getAllRoutines : function(req,res){
		//find user, populate immediate _routine/_task keys
		User.findOne({_id: req}).populate('_routine _task').exec(function(err,routine) {
			//also populate _routine._task using Task model
			var options = {
				path: '_routine._task',
				model: 'Task'
			};
			if(err)return handleError(err);
			//grab all routines, pass obj to front end
			User.populate(routine,options,function(err,routine){

				res.json({routines:routine._routine,tasks:routine._task,home:routine.home,username:routine.username});
				
			});
		});
	}
}