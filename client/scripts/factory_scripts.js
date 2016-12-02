//Front End Factories
//Tasks Factory
TCommander.factory('task_factory', function($http, $location) 
{
	//initialize factory obj.
	var factory = {};
	//setting test object
	var test_group = {name:"frandy",age:"35 (just dandy)"}

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
		})
	};

	//return object methods
	return factory;
});