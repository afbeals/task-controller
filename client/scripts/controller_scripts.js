//Front end controllers
//Navbar Controller
TCommander.controller('nav_controller',['$scope', 'task_factory', function ($scope, task_factory){
	console.log('using nav_controller controller');
}]);

//Form Controller
TCommander.controller('task_controller',['$scope', 'task_factory',function($scope, task_factory){
	console.log('using task_controller controller');

}]);