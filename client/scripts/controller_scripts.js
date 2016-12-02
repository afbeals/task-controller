//Front end controllers
//Navbar Controller
TCommander.controller('nav_controller',['$scope', 'task_factory', function ($scope, task_factory){
	console.log('using nav_controller controller');
}]);

//Form Controller
TCommander.controller('task_controller',['$scope', 'task_factory',function($scope, task_factory){
	//initialize obj to maintain consistent data type
	$scope.task = {};
	var counter = 1;
	var routine_check = function(data,callback){
		if(!sessionStorage.currentRoutine){
			sessionStorage.setItem('currentRoutine', JSON.stringify(data));
		}else if(sessionStorage.currentRoutine){
			callback(data);
		}
	};
	//add addTask method to $scope
	$scope.addTaskToSesRoutine = function(){
		
		//pass consoleLogFactory the callback that will run the data defined by FE
		
	};

	$scope.createRoutine = function(){
		routine_check($scope.task, function(data){task_factory.addTaskToRoutine(data)});
	}
	$scope.consoleLogStatic = function(){
		//pass consoleLogFactory the callback that will run the data defined by factory
		task_factory.consoleLogStatic(function(data){
			console.log(data);
		});
	};


}]);