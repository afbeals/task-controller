//Tcommander Services
TCommander.service('users_service',function(){
	var service = {};


	service.addCurrentUser = function(user){
		service.currentUser = user.username;
		service.first_name = user.first_name;
		service.home = user.home;
		service.email = user.email;
	}

	service.clearCurrentUser = function(){
		service.currentUser = '';
	}

	return service;
});