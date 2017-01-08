//Front end controllers
//Navbar Controller
TCommander.controller('nav_controller',['$cookies','$scope', 'users_factory', function ($cookies, $scope, routines_factory){
}]);

//Form Controller
TCommander.controller('routines_controller',['$routeParams','$cookies','$scope', 'routines_factory',function($routeParams,$cookies, $scope, routines_factory){
	//initialize obj to maintain consistent data type
	$scope.task = {};
	$scope.routine=[];
	$scope.dynForm = {};
	$scope.address = {};
	$scope.totalTime = "";
	$scope.newRoutine = {tasks:[]};
	$scope.param = $routeParams.routine_name;

	//unused

	//future implementation
		//Google Maps Api info
			//set location for pin / create map on front end in <div id="map"></div>
			//var cities = "Atlanta, USA";
		  	//var geocoder= new google.maps.Geocoder();
		  
		   	//$scope.markers = [];
		   
		   	// var createMarker = function (info){
		    //     var marker = new google.maps.Marker({
		    //         map: $scope.map,
		    //         position: new google.maps.LatLng(info.lat(), info.lng())
		    //     });
		   	// }

		  	// geocoder.geocode( { 'address': cities }, function(results, status) {
		   //  	if (status == google.maps.GeocoderStatus.OK) {
		   //      	newAddress = results[0].geometry.location;
		   //      	$scope.map.setCenter(newAddress);
		   //      	createMarker(newAddress)
		  	//  	}
		  	// });

		  // $scope.mapOptions = {
		   //      zoom: 4,
		   //      //center: new google.maps.LatLng(41.923, 12.513),
		   //      mapTypeId: google.maps.MapTypeId.TERRAIN
		   //  }

		    //$scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions);
			
	//functions
	//loop through sessionStorage to get currently stored task and add update newRoutine from sessionStorage
	var get_session_task = function(){
		for(task in sessionStorage){
			$scope.newRoutine.tasks.push(JSON.parse(sessionStorage[task]));
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

    //Google Distance Matrix info
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


//testing variable chang to $cookies.home info recived from server session
	var testHome = "Portland, OR";

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
            	getNewDistance(testHome, $scope.task.task_location);           
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
			//remove from sessionStorage
			sessionStorage.removeItem("task:"+name);
			//remove from array
			$scope.newRoutine.tasks.splice(elementPosition, 1);
			calculateTotalDuration(timeConvert);
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
			}
		}
	}

	//retrieve all routines
	$scope.getAllRoutines = function(){
		routines_factory.getAllRoutines(function(routine){
			$scope.routine = routine;
		})
	}

	//Starter functions on load of controller
	get_session_task();
	calculateTotalDuration(timeConvert);
}]);

//Users Controller
TCommander.controller('users_controller',['$cookies','$scope', 'users_factory', function ($cookies, $scope, users_factory){
	$scope.user={};

	//password confirmation match check:
	$scope.passMatch = function(){
	}

	$scope.registerUser = function(){
		users_factory.registerUser($scope.user);
		$scope.user={};
	}

	$scope.loginUser = function(){
		users_factory.loginUser($scope.user,function(user){
			$cookies.remove('username');
			$cookies.remove('first_name');
			$cookies.put('username',user.username);
			$cookies.put('first_name',user.first_name);
			console.log($cookies.get('username'));
		});
	}

}]);

TCommander.controller('single_routine_controller',['$routeParams','$cookies','$scope', 'routines_factory',function($routeParams,$cookies, $scope, routines_factory){
	$scope.routine={};
	$scope.param = $routeParams.routine_name;

	//retrieve single routine
	var getRoutine = function(){
		routines_factory.getRoutine($scope.param,function(routine){
			$scope.routine = routine;
		})
	}

	//Starter functions on load of controller
	getRoutine();
}]);