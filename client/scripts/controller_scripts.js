//Front end controllers
//Navbar/Users Controller
TCommander.controller('nav_controller',['$location','$cookies','$scope', 'users_factory','users_service', function ($location, $cookies, $scope, users_factory, users_service){
	$scope.currentUser=users_service;
	$scope.logOutUser = function(){
		users_service.logout(function(){
			$location.path('/login');
		});
	}

}]);

//Form Controller
TCommander.controller('add_task_controller',['$routeParams','$cookies','$scope', 'routines_factory',function($routeParams,$cookies, $scope, routines_factory){
	//initialize obj to maintain consistent data type
	$scope.task = {};
	$scope.routine={};
	$scope.dynForm = {};
	$scope.address = {};
	$scope.totalTime = "";
	$scope.newRoutine = {tasks:[]};
	$scope.param = $routeParams.routine_name;
	$scope.locations = [];

	//unused

	//future implementation
			
	//functions
	//loop through sessionStorage to get currently stored task and add update newRoutine from sessionStorage
	var get_session_task = function(){
		for(task in sessionStorage){
			$scope.newRoutine.tasks.push(JSON.parse(sessionStorage[task]));
			var currentLocation = JSON.parse(sessionStorage[task])
			$scope.locations.push(currentLocation.task_location);
		}
	}

	//calculate distance
	//loop  through task durations and lengths to get total routine time
    var calculateTotalDuration = function(callback){
    	var timeTotal = 0;
    	for(var duration in $scope.newRoutine.tasks){
    		//get all duration from task in seconds add to total time
    		timeTotal+=$scope.newRoutine.tasks[duration].task_duration;
    		//convert each task length to seconds add to total time
    		timeTotal+=($scope.newRoutine.tasks[duration].task_length * 60);
		}
		//pass total time to callback
		callback(timeTotal);
    }

    //convert time to string
	var timeConvert = function(time){
		time = Number(time);
		var h = Math.floor(time / 3600);
		var m = Math.floor(time % 3600 / 60);
		var s = Math.floor(time % 3600 % 60);
		$scope.totalTime = ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 
	}

	//retrieve all routines
	var getAllRoutines = function(){
		routines_factory.getAllRoutines(function(routine){
			console.log(routine);
			$scope.routine = routine;
		})
	}

    //Google Distance Matrix info

    //Google Maps Api info
	//set location for pin / create map on front end in <div id="map"></div>
	var cities;
	var locationsCheck = function(){
		if($scope.locations.length){
			$scope.locations.push($cookies.get('home'))
			cities = $scope.locations;
		}else{
			cities = ["Portland, OR"];
		}	
	}
	

  	var geocoder= new google.maps.Geocoder();
  
   	$scope.markers = [];
   
   	var createMarker = function (info){
        var marker = new google.maps.Marker({
            map: $scope.map,
            draggable: true,
          	animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(info.lat(), info.lng())
        });
   	}

   	$scope.addMarker = function(city){
   		geocoder.geocode( { 'address': city }, function(results, status) {
	    	if (status == google.maps.GeocoderStatus.OK) {
	    		$scope.locations.push(city);
	        	newAddress = results[0].geometry.location;
	        	$scope.map.setCenter(newAddress);
	        	createMarker(newAddress)
	  	 	}
	  	});
   	}

   	var geoloadCurrentLocations = function(){
	   	for(var x = 0;x<cities.length;++x){
	   		geocoder.geocode( { 'address': cities[x] }, function(results, status) {
		    	if (status == google.maps.GeocoderStatus.OK) {
		        	newAddress = results[0].geometry.location;
		        	$scope.map.setCenter(newAddress);
		        	createMarker(newAddress)
		  	 	}
		  	});
	   	}	
   	}
   	
  	
  $scope.mapOptions = {
        zoom: 9,
        //center: new google.maps.LatLng(39.923, 12.513),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions);

	//create scope function pass form data to function for destination calculation run callback for res info
	var getNewDistance = function(origina,destination1){
		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		{
		    origins: [origina],
		    destinations: [destination1],
		    travelMode: 'DRIVING'
		    // transitOptions: TransitOptions,
		    // drivingOptions: DrivingOptions,
		    // unitSystem: UnitSystem,
		    // avoidHighways: Boolean,
		    // avoidTolls: Boolean,
		}, distanceMatrixResponse);
	}

	//distance matrix response function
    var distanceMatrixResponse = function(response,status){
        if (status == 'OK') {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;
            var task_name = $scope.task.task_name;
            var session_task_name = "task:"+task_name;
            //add task duration to task for total time calculation
            $scope.task.task_duration=Math.floor(response.rows[0].elements[0].duration.value);
            //set each task by 'task: "task_name"' with object information
            sessionStorage.setItem(session_task_name,JSON.stringify($scope.task));
            //push new task to newRoutine task array to update printed list
            $scope.newRoutine.tasks.push($scope.task);
            //add order value to last newly added task
            $scope.newRoutine.tasks[$scope.newRoutine.tasks.length-1].order = $scope.newRoutine.tasks.length-1;
            //run function to sum all time and then pass to timeConvert to change format
            calculateTotalDuration(timeConvert);
            //clear task for next insert
            $scope.task={};
            //apply all changes
            $scope.$apply();
            // for (var i = 0; i < origins.length; i++) {
            //   var results = response.rows[i].elements;
            //   for (var j = 0; j < results.length; j++) {
            //     var element = results[j];
            //     var distance = element.distance.text;
            //     var duration = element.duration.text;
            //     var from = origins[i];
            //     var to = destinations[j];
            //   }
            // }
        }
    }

	//Controller Scope Methods
	//add username and total duration to newRoutine to pass to factory.
	$scope.createRoutine = function(){
		$scope.newRoutine._username = $cookies.get('username');
		$scope.newRoutine.total_duration = $scope.totalTime;
		routines_factory.createRoutine($scope.newRoutine);
	}
	
	//clear form values
	$scope.clearForm = function(){
		$scope.task = {};
	}

    $scope.addTaskToSesRoutine = function(){
        //grab task_name as identifier
        var task_name = $scope.task.task_name;
        var session_task_name = "task:"+task_name;
        //compute length of routine
        var size = Object.keys(sessionStorage).length;
        //check if already exist, if it does then alert the user
        if(!sessionStorage[session_task_name]){
            //if first item in list then use home as origin location
            if(sessionStorage[session_task_name] == sessionStorage[Object.keys(sessionStorage)[0]]){
            	$scope.task.order = 0;
            	$scope.locations.push($cookies.get('home'));
            	getNewDistance($cookies.get('home'), $scope.task.task_location);           
            }else{
            	//set order to last in list of objects
            	$scope.task.order  = JSON.parse(sessionStorage[Object.keys(sessionStorage)[size - 1]]).order+1;
                //pass previous location as origin for duration calculation
                getNewDistance(JSON.parse(sessionStorage[Object.keys(sessionStorage)[size - 1]]).task_location, $scope.task.task_location);
            }
        } else {
            alert('sorry '+$scope.task.task_name+' already exist, but you can still remove, edit, or use a different name!')
        }
        
    };

    
	//remove task from routine list
	//take in unique name of task
	$scope.removeTask = function(name){
		if(sessionStorage.getItem("task:"+name)){
			//search through tasks array for object matching name to get index
			var elementPosition = $scope.newRoutine.tasks.map(function(x) {return x.task_name; }).indexOf(name);
			var item = JSON.parse(sessionStorage.getItem('task:'+name));
			var currentLocation = item.task_location;
			console.log(item,currentLocation,$scope.locations);
			//remove from sessionStorage
			sessionStorage.removeItem("task:"+name);
			//remove from array
			$scope.newRoutine.tasks.splice(elementPosition, 1);
			//recalculate time
			calculateTotalDuration(timeConvert);
			$scope.locations.splice($scope.locations.indexOf(currentLocation,1));
			geoloadCurrentLocations();
		}else{
			alert('hmm something went wrong, please reload the page and try again.')
		}
	};
	//remove all task from routine
	$scope.removeAllTask = function(){
		if($scope.newRoutine.tasks.length > 1){
			if (confirm('Are you sure you want to clear your task?')){
			    sessionStorage.clear();
			    $scope.newRoutine.tasks=[];
			    $scope.totalTime="";
			    $scope.locations = [];
			    geoloadCurrentLocations();
			}
		}
	}

	//add previous task to newRoutine
	$scope.addPreviousTask = function(task_name){
		console.log($scope.routine);
		for(var task in $scope.routine.tasks){
			if($scope.routine.tasks[task].task_name == task_name){
				$scope.task.task_name = $scope.routine.tasks[task].task_name
				$scope.task.task_length = $scope.routine.tasks[task].task_length
				$scope.task.task_location = $scope.routine.tasks[task].task_location
			}
		}
	}

	//check if present in routine
	$scope.presentInDatabase = function(task_name){
		var present = false;
		for (var task in $scope.routine.tasks){
			if($scope.routine.tasks[task].task_name == task_name){
				present = true;
			}
		}
		return present;
	}

	//Starter functions on load of controller
	getAllRoutines();
	get_session_task();
	calculateTotalDuration(timeConvert);
	locationsCheck();
	geoloadCurrentLocations();
}]);

TCommander.controller('users_controller',['$location','$cookies','$scope', 'users_factory','users_service', function ($location, $cookies, $scope, users_factory,users_service){
	$scope.user={};
	$scope.currentUser=users_service;

	$scope.registerUser = function(){
		users_factory.registerUser($scope.user,function(){
			$cookies.put('username',user.username);
			$cookies.put('first_name',user.first_name);
			$cookies.put('home',user.home);
			users_service.addCurrentUser($scope.user);
		});
		$scope.user={};
	}

	$scope.loginUser = function(){
		users_service.login($scope.user,function(auth){
			if(auth == true){
				console.log('welcome');
				$location.path('/create-a-routine');
			}else{
				console.log('could not log user in');
			}
		});

	}

	$scope.go = function(path) {
	  $location.path(path);
	}

	$scope.testAuth = function(){
		users_factory.testAuth();
	}

	$scope.passportRegisterUser = function(){
		users_factory.passportRegisterUser($scope.user,function(){
			alert("finished")
		});
		$scope.user={};
	}

}]);

//routines Controller
TCommander.controller('routines_controller',['$location','$cookies','$scope', 'users_factory','users_service','routines_factory', function ($location, $cookies, $scope, users_factory, users_service,routines_factory){
	$scope.routine={};
	$scope.displayedRoutine = {};


	//retrieve all routines
	var getAllRoutines = function(){
		routines_factory.getAllRoutines(function(routine){
			$scope.routine = routine;
			console.log(routine);
		})
	}

	$scope.displayRoutine = function(routine){
		$scope.displayedRoutine = routine;

	}

	//starter functions
	getAllRoutines();
}]);


TCommander.controller('single_routine_controller',['$routeParams','$cookies','$scope', 'routines_factory',function($routeParams,$cookies, $scope, routines_factory){
	$scope.routine={};
	$scope.param = $routeParams.routine_name;

	//retrieve single routine
	var getRoutine = function(){
		routines_factory.getRoutine($scope.param,function(routine){
			$scope.routine = routine;
			console.log(routine);
		})
	}

	//Starter functions on load of controller
	getRoutine();
}]);