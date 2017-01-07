//front end routing
TCommander.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/Create-A-Routine', {templateUrl: 'partials/task_form.html', controller: 'task_controller'})
	.when('/Register', {templateUrl: 'partials/registration.html', controller: 'users_controller'})
	.when('/Login',{templateUrl: 'partials/login.html', controller: 'users_controller'})
	.when('/Profile',{templateUrl: 'partials/profile.html', controller: 'users_controller'})
	.otherwise({redirectTo: '/'});
});

//update form path