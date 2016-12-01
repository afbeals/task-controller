//Front end controllers
//Navbar Controller
TCommander.controller('nav_controller',['$scope', 'task_factory', function ($scope, task_factory){
	console.log('using nav_controller controller');
}]);

//Form Controller
TCommander.controller('task_controller',['$scope', 'task_factory',function($scope, task_factory){
	//initialize obj to maintain consistent data type
	$scope.task = {};
	//add addTask method to $scope
	$scope.addTask = function(){
		//pass consoleLogFactory the callback that will run the data defined by FE
		task_factory.addTask($scope.task);
	};
	
	$scope.consoleLogStatic = function(){
		//pass consoleLogFactory the callback that will run the data defined by factory
		task_factory.consoleLogStatic(function(data){
			console.log(data);
		});
	};
}]);