//front end routing
TCommander.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/Create-A-Routine', {templateUrl: 'partials/createRoutine.html', controller: 'routines_controller', caseInsensitiveMatch: true})
	.when('/Register', {templateUrl: 'partials/registration.html', controller: 'users_controller', caseInsensitiveMatch: true})
	.when('/Login',{templateUrl: 'partials/login.html', controller: 'users_controller', caseInsensitiveMatch: true})
	.when('/Profile',{templateUrl: 'partials/profile.html', controller: 'users_controller', caseInsensitiveMatch: true})
	.when('/Routines',{templateUrl: 'partials/routines.html', controller: 'routines_controller', caseInsensitiveMatch: true})
	.when('/Routines/:routine_name',{templateUrl: 'partials/routine.html', controller: 'single_routine_controller', caseInsensitiveMatch: true})
	.otherwise({redirectTo: '/Login'});
});

//update form path