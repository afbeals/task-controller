//Front End Factories
//Tasks Factory
TCommander.factory('task_factory', function($http, $location) 
{
	//initialize factory obj.
	var factory = {};

	//factory method to run controller callback using data supplied by factory
	factory.consoleLogStatic = function(callback){
		callback(test_group);
	};
	//pass single task data to BE
	factory.addTaskToRoutine = function(task){
		$http.post('/addTaskToRoutine', task).success(function()
		{
			alert("Task successfully added!");
		}).error(function()
		{
			alert("Uh oh, lets try that again. If problem persists, please contact us!");
		});
	};


	//batch insert task, then run callback which saves routine object with task arary
	factory.addAllTask = function(routine,callback){
		//first remove duration from task
		var routineCopy = angular.copy(routine);
		for(var x = 0; x <routineCopy.length-1;++x){
			delete routineCopy[x].task_duration;
		}
			$http.post('/addAllTask',routineCopy).success(function(){
			console.log("successful addAllTask");
			callback();
		}).error(function(){
			alert('....well that was weird, lets try that again!');
		});
	}

	//get current routine and push to backend
	factory.createRoutine = function(routine,duration){
		// var routineCopy = [];
		// routineCopy = angular.copy(routine);
		// routineCopy.push({total_routine_duration:duration});
		// var masterObj = {};
		// for(var x = 0; x < routineCopy.length-1; ++x){
		//     masterObj[x] = {task_name:routineCopy[x].task_name,length:routineCopy[x].task_length,duration:routineCopy[x].task_duration,location:routineCopy[x].task_location};
		// }
		// masterObj[routineCopy.length-1] = routineCopy[routineCopy.length-1];
		// console.log("routine: ",routine,"routineCopy: ",routineCopy,"masterObj: ",masterObj)
		// $http.post('/createRoutine',masterObj).success(function(){
		// 	alert("Routine created successfully!");
		// }).error(function(){
		// 	alert('....well that was weird, lets try that again!');
		// });
		console.log("now ran createRoutine")
	};

	//return object methods
	return factory;
});

//Users Factory
TCommander.factory('users_factory', function($http, $location) {
	//initialize factory obj.
	var factory = {};

	factory.registerUser = function(user){
		$http.post('/registerUser',user).success(function(){
			console.log('successfully added user', user.first_name)
		}).error(function(){
			console.log("there was an error in registering user")
		})
	}

	factory.loginUser = function(user){
		$http.post('loginUser',user).success(function(){
			console.log('user'+ user.username + 'sucessfully added');
			$location.path("#/Create-A-Routine");
		}).error(function(){
			console.log("there was an error logging user in")
		})
	}

	//return object methods
	return factory;
});