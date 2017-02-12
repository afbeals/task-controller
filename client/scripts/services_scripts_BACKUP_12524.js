//Tcommander Services
TCommander.service('users_service',function($http){
	var service = {},
		localStorageId = 'ABoloknas1tGCTelrr';

//replace by login service
	// service.addCurrentUser = function(user){
	// 	service.currentUser = user.username;
	// 	service.first_name = user.first_name;
	// 	service.home = user.home;
	// 	service.email = user.email;
	// }
//replace by logout service
	// service.clearCurrentUser = function(){
	// 	service.currentUser = '';
	// }

	service.login = function(user,callback){
		//make a call to loginUser with the users cred.
		$http.post('/loginUser', user).success(function(response){
			//if token in response, login = successful
			if(response.token){
				//store username and token in session to keep user logged in between sessions
				localStorage.setItem(localStorageId,JSON.stringify({username:user.username, token: response.token}));

				//set user data in service for app
				service.currentUser = user.username;
				service.first_name = response.user.first_name;
				service.home = response.user.home;
				service.email = response.user.email;

				//add token to auth header for all request made with this service
				$http.defaults.headers.common['Authorization'] = response.token;

				//respond letting app know it was successful
				callback(true);
			}else{
				//respond letting app know login was not successful
				callback(false);
			}
		});
	}

<<<<<<< HEAD
	service.clearCurrentUser = function(){
		service = {};
=======
	service.isLoggedIn = function(){
		if(localStorage.getItem(localStorageId)){
			return(true)
		}else{
			return(false);
		}
>>>>>>> style-updates
	}

	service.logout = function(callback){
		//remove user from local storage, clear header, and clear stored service user data
		localStorage.removeItem(localStorageId);
		$http.defaults.headers.common['Authorization'] = '';
		service = {};
		callback();
	}

	

	return service;
});

