//Front End Factories
//Tasks Factory
TCommander.factory('task_factory', function($http, $location) 
{
	var factory = {};

	factory.consoleLogFactory = function(data){
		console.log("task_factory");
	}

	return factory;
});