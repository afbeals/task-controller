//Front end controllers
//Navbar Controller
TCommander.controller('nav_controller',['$scope', 'task_factory', function ($scope, task_factory){
	console.log('using nav_controller controller');
}]);

//Form Controller
TCommander.controller('task_controller',['$scope', 'task_factory',function($scope, task_factory){
	//initialize obj to maintain consistent data type
	$scope.task = {};
	$scope.routine = [];
	$scope.dynForm = {};
	$scope.address = {};
	$scope.totalTime = "";

	//initialize variables
	

	//unused
	//check if routine exist in session storage, if so run callback with routine data (unused)
	var routine_check = function(data,callback){
		if(!sessionStorage.currentroutine){
			sessionStorage.setItem('currentroutine', JSON.stringify(data));
		}else if(sessionStorage.currentroutine){
			callback(data);
		}
	};
	//run routine_check and pass task obj, then run factory with passed info
	$scope.createroutine = function(){
		routine_check($scope.task, function(data){task_factory.addTaskToroutine(data)});
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
	$scope.createroutine = function(){
		task_factory.createroutine($scope.routine);

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
	//create scope function pass form data to function for destination calculation
	getNewDistance = function(origina,destination1){
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
            console.log(response);
            //add task duration to task (get ready to submit to database)
            $scope.task.task_duration=Math.floor(response.rows[0].elements[0].duration.value);
            //set each task by 'task: "task_name"' with object information
            sessionStorage.setItem(session_task_name,JSON.stringify($scope.task));
            //push new task to array to update printed list
            $scope.routine.push(JSON.parse(sessionStorage[session_task_name]));
            calculateTotalDuration(timeConvert);
            $scope.task={};
            
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

	//sessionStorage 
	//loop through sessionStorage to get currently stored task
	var get_session_task = function(){
		for(task in sessionStorage){
			$scope.routine.push(JSON.parse(sessionStorage[task]));
		}
	}
	
	var testHome = "Portland, OR";

    //scope task method
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
                getNewDistance(testHome, $scope.task.task_location);
            }else{
                getNewDistance(JSON.parse(sessionStorage[Object.keys(sessionStorage)[size - 1]]).task_location, $scope.task.task_location);
            }
        } else {
            alert('sorry '+$scope.task.task_name+' already exist, but you can still remove, edit, or use a different name!')
        }
        
    };

    //calculate distance
    var calculateTotalDuration = function(callback){
    	var timeTotal = 0;
    	for(var duration in $scope.routine){
    		timeTotal+=$scope.routine[duration].task_duration;
    		timeTotal+=($scope.routine[duration].task_length * 60);
		}
		callback(timeTotal);
    }
	function timeConvert (time){
		time = Number(time);
		var h = Math.floor(time / 3600);
		var m = Math.floor(time % 3600 / 60);
		var s = Math.floor(time % 3600 % 60);
		$scope.totalTime = ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 
	}
	//remove task from routine list
	//take in unique name of task
	$scope.removeTask = function(name){
		if(sessionStorage.getItem("task:"+name)){
			//remove from sessionStorage
			var elementPosition = $scope.routine.map(function(x) {return x.task_name; }).indexOf(name);
			sessionStorage.removeItem("task:"+name);
			//and remove from array to update front end
			$scope.routine.splice(elementPosition, 1);
			calculateTotalDuration(timeConvert);
		}else{
			alert('hmm something went wrong, please reload the page and try again.')
		}
	};
	//remove all task from routine
	$scope.removeAllTask = function(){
		if($scope.routine.length > 1){
			if (confirm('Are you sure you want to clear your task?')){
			    sessionStorage.clear();
			    $scope.routine=[];
			    $scope.timeTotal="";
			    $scope.apply();
			}
		}else{
			sessionStorage.clear();
			$scope.routine=[];
			$scope.timeTotal="";
			$scope.apply();
		}
	}
	//run initial functions for SPA
	//initial run of loop to pull up current task
	get_session_task();
	calculateTotalDuration(timeConvert);
}]);