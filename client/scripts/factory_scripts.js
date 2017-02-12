//Front End Factories
//Tasks Factory
TCommander.factory('routines_factory', function($http, $location) 
{
	//initialize factory obj.
	var factory = {};

	//unused

	//get newRoutine, create & use deep copy to not update scope obj
	factory.createRoutine = function(newRoutine){
		// create deep copy of routine
		var routineCopy = {};
		routineCopy = angular.copy(newRoutine);
		// remove duration from each task
		for(var x = 0; x <routineCopy.tasks.length;++x){
			delete routineCopy.tasks[x].task_duration;
		}
		//pass deep copy to server for db submission
		$http.post('/createRoutine',routineCopy).success(function(){
			console.log("successful addAllTask");
		}).error(function(){
			alert('....well that was weird, lets try that again!');
			console.log("factory.createRoutine error received");
		});
	};

	factory.getAllRoutines = function(callback){
		$http.get('/getAllRoutines').success(function(data){
			callback(data);
		}).error(function(){
			console.log("factory getAllRoutines retrieval err");
			alert("Hmm that wasn't supposed to happen...");
		})
	}

	factory.getRoutine = function(routine_name,callback){
		console.log(routine_name);
		$http.get('/getRoutine/'+routine_name).success(function(data){
			callback(data);
		}).error(function(){
			console.log("factory getRoutine retrieval err");
		})
	}

	//return object methods
	return factory;
});

//Users Factory
TCommander.factory('users_factory', function($cookies, $http, $location) {
	//initialize factory obj.
	var factory = {};
	var testobj = {};

	factory.registerUser = function(user){
		$http.post('/registerUser',user).success(function(){
			$location.path("Create-A-Routine");
			callback();
		}).error(function(){
			console.log("there was an error in registering user")
		})
	}

	//moved to service
	// factory.loginUser = function(user,callback){
	// 	$http.post('/loginUser',user).success(function(data){
	// 		$location.path("Create-A-Routine");
	// 		callback(data);
	// 	}).error(function(){
	// 		console.log("there was an error logging user in")
	// 	})
	// }

	//moved to service
	// factory.logOutUser = function(){
	// 	$http.post('/logOutUser').success(function(){
	// 		$location.path("/");
	// 	}).error(function(){
	// 		console.log("there was an error logging user out")
	// 	})
	// }
//will be moved to header.auth service to be auto sent with all request
	factory.testAuth = function(){
		console.log(testobj);
		$http.post('/test', testobj).success(function(){
			console.log('so successfulj!')
			//callback();
		}).error(function(){
			console.log("there was an error in registering user");
		})
	}

	factory.passportRegisterUser = function(user,callback){
		$http.post('/passportRegister',user).success(function(jwt){
			console.log(jwt);
			testobj = jwt;
			callback();
		}).error(function(message,response){
			console.log(message,response);
		})
	}

	//return object methods
	return factory;
});

