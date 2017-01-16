//front end routing
TCommander.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/Create-A-Routine', {templateUrl: 'partials/createRoutine.html', controller: 'routines_controller'})
	.when('/Register', {templateUrl: 'partials/registration.html', controller: 'users_controller'})
	.when('/Login',{templateUrl: 'partials/login.html', controller: 'users_controller'})
	.when('/Profile',{templateUrl: 'partials/profile.html', controller: 'users_controller'})
	.when('/Routines',{templateUrl: 'partials/routines-main.html', controller: 'routines_controller'})
	.when('/Routines/:routine_name',{templateUrl: 'partials/routine.html', controller: 'single_routine_controller'})
	.otherwise({redirectTo: '/'});
});

//update form path