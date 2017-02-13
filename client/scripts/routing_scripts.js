//front end routing
TCommander.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/Create-A-Routine', {templateUrl: 'partials/createRoutine.html', controller: 'add_task_controller', caseInsensitiveMatch: true})
	.when('/Register', {templateUrl: 'partials/registration.html', controller: 'users_controller', caseInsensitiveMatch: true})
	.when('/Login',{templateUrl: 'partials/login.html', controller: 'users_controller', caseInsensitiveMatch: true})
	.when('/Profile',{templateUrl: 'partials/profile.html', controller: 'users_controller', caseInsensitiveMatch: true})
	.when('/Routines',{templateUrl: 'partials/routines.html', controller: 'routines_controller', caseInsensitiveMatch: true})
	.when('/Routines/:routin_name',{templateUrl: 'partials/routine.html', controller: 'single_routine_controller', caseInsensitiveMatch: true})
	.otherwise({redirectTo: '/Login'});
	$locationProvider.html5Mode({enabled:true});
}).run(['$rootScope', '$location', 'users_service', function ($rootScope, $location, users_service) {
    $rootScope.$on('$routeChangeStart', function (e,next,current) {
    	var path = $location.path();
		//check localstorage for token to see if logged in, if not login or register then send to login
    	if(path.toLowerCase() != "/login" && path.toLowerCase() != "/register"){
			(function(){
	    		if (!users_service.isLoggedIn()) {
		            console.log('Denied Access, Login Needed');
		            e.preventDefault();
		            $location.path('/login');
		        }
	    	}())
		}
    });
}]);

//update form path

