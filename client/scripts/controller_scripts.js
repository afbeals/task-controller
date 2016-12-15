//Front end controllers
//Navbar Controller
TCommander.controller('nav_controller',['$scope', 'task_factory', function ($scope, task_factory){
	console.log('using nav_controller controller');
}]);

//Form Controller
TCommander.controller('task_controller',['$scope', 'task_factory',function($scope, task_factory){
	//initialize obj to maintain consistent data type
	$scope.task = {};
	$scope.currentTasks = [];
	$scope.dynForm = {};
	$scope.address = {};

	//unused
	//check if routine exist in session storage, if so run callback with routine data (unused)
	var routine_check = function(data,callback){
		if(!sessionStorage.currentRoutine){
			sessionStorage.setItem('currentRoutine', JSON.stringify(data));
		}else if(sessionStorage.currentRoutine){
			callback(data);
		}
	};
	//run routine_check and pass task obj, then run factory with passed info
	$scope.createRoutine = function(){
		routine_check($scope.task, function(data){task_factory.addTaskToRoutine(data)});
	}


	//demonstrators
	//fun factories 'consoleLogStatic' method and pass it a function with info as callback, then console log the return data
	$scope.consoleLogStatic = function(){
		task_factory.consoleLogStatic(function(data){
			console.log(data);
		});
	};


	//Controller Methods
	//pass routine (array of obj) to factory, to get sent to BE
	$scope.createRoutine = function(){
		task_factory.createRoutine($scope.currentTasks);

	};
	//clear form values
	$scope.clearForm = function(){
		$scope.task = {};
	}

	//API's
	//Google Maps Api info
	//set location for pin
	var cities = "Atlanta, USA";
  	var geocoder= new google.maps.Geocoder();
  
   	$scope.markers = [];
   
   	var createMarker = function (info){
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat(), info.lng())
        });
   	}

  	geocoder.geocode( { 'address': cities }, function(results, status) {
    	if (status == google.maps.GeocoderStatus.OK) {
        	newAddress = results[0].geometry.location;
        	$scope.map.setCenter(newAddress);
        	createMarker(newAddress)
    	}
  	 });

  	$scope.mapOptions = {
        zoom: 4,
        //center: new google.maps.LatLng(41.923, 12.513),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions);

    //Google Distance Matrix info
    //create scope function pass form data in function for calculation
	$scope.getNewDistance = function(origina,destination1){
		console.log($scope.address);
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
		  }, callback);

		function callback(response, status) {
		  if (status == 'OK') {
		    var origins = response.originAddresses;
		    var destinations = response.destinationAddresses;
		    console.log(response.rows[0].elements[0].duration.text);
		    console.log(response.rows[0].elements[0].duration.value);
		    for (var i = 0; i < origins.length; i++) {
		      var results = response.rows[i].elements;
		      for (var j = 0; j < results.length; j++) {
		        var element = results[j];
		        var distance = element.distance.text;
		        var duration = element.duration.text;
		        var from = origins[i];
		        var to = destinations[j];
		      }
		    }
		  }
		}
	}

	//sessionStorage 
	//loop through sessionStorage to get currently stored task
	var get_session_task = function(){
		for(task in sessionStorage){
			$scope.currentTasks.push(JSON.parse(sessionStorage[task]));
		}
	}
	
	//scope task method
	$scope.addTaskToSesRoutine = function(){
		//grab task_name as identifier
		var task_name = $scope.task.task_name;
		var session_task_name = "task:"+task_name;
		//check if already exist, if it does then alert the user
		 if(!sessionStorage[session_task_name]){
		 	//set each task by 'task: "task_name"' with object information
		 	sessionStorage.setItem(session_task_name,JSON.stringify($scope.task));
		 	//push new task to array to update printed list
		 	$scope.currentTasks.push(JSON.parse(sessionStorage[session_task_name]));
		 } else {
		 	alert('sorry '+$scope.task.task_name+' already exist, but you can still remove, edit, or use a different name!')
		 }
		 //clear task afterwards for next task
		 $scope.task={};
	};
	
	//remove task from routine list
	//take in unique name of task
	$scope.removeTask = function(name){
		//if task exist in storage
		if(sessionStorage.getItem("task:"+name)){
			//remove from sessionStorage
			sessionStorage.removeItem("task:"+name);
			//and remove from array to update front end
			$scope.currentTasks.splice(name, 1);
		}else{
			alert('hmm something went wrong, please reload the page and try again.')
		}
	};
	//remove all task from routine
	$scope.removeAllTask = function(){
		console.log($scope.currentTasks,"sesStor",sessionStorage)
		if($scope.currentTasks.length > 1){
			if (confirm('Are you sure you want to clear your task?')){
			    console.log("yeuyspe");
			    sessionStorage.clear();
			    $scope.currentTasks=[];
			}
		}else{
			sessionStorage.clear();
			$scope.currentTasks=[];
		}
	}
	//run initial functions for SPA
	//initial run of loop to pull up current task
	get_session_task();
}]);