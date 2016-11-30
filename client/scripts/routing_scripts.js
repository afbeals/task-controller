//front end routing
TCommander.config(function($routeProvider, $locationProvider){
	$routeProvider.when('/form', {templateUrl: 'partials/task_form.html', controller: 'task_controller'}).otherwise({redirectTo: '/'});
});

//update form path