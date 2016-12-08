//Front end controllers
//Navbar Controller
TCommander.controller('nav_controller',['$scope', 'task_factory', function ($scope, task_factory){
	console.log('using nav_controller controller');
}]);

//Form Controller
TCommander.controller('task_controller',['$scope', 'task_factory',function($scope, task_factory){
	//initialize obj to maintain consistent data type
	$scope.task = {};
	$scope.currentTask = [];
	$scope.dynForm = {}


	var routine_check = function(data,callback){
		if(!sessionStorage.currentRoutine){
			sessionStorage.setItem('currentRoutine', JSON.stringify(data));
		}else if(sessionStorage.currentRoutine){
			callback(data);
		}
	};
	

	// $scope.createRoutine = function(){
	// 	routine_check($scope.task, function(data){task_factory.addTaskToRoutine(data)});
	// }
	$scope.consoleLogStatic = function(){
		//pass consoleLogFactory the callback that will run the data defined by factory
		task_factory.consoleLogStatic(function(data){
			console.log(data);
		});
	};
	//pass routine to BE
	$scope.createRoutine = function(){
		task_factory.createRoutine($scope.currentTask);

	};
	//clear form values
	$scope.clearForm = function(){
		$scope.task = {};
	}

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

	//sessionStorage section
	//loop through sessionStorage to get currently stored task
	var get_session_task = function(){
		for(task in sessionStorage){
			$scope.currentTask.push(JSON.parse(sessionStorage[task]));
		}
	}
	//add addTask method to $scope
	$scope.addTaskToSesRoutine = function(){
		//grab task_name as identifier
		var task_name = $scope.task.task_name;
		var session_task_name = "task:"+task_name;
		//check if already exist, if it does then alert the user
		 if(!sessionStorage[session_task_name]){
		 	//set each task by 'task: "task_name"' with object information
		 	sessionStorage.setItem(session_task_name,JSON.stringify($scope.task));
		 	//push new task to array to update printed list
		 	$scope.currentTask.push(JSON.parse(sessionStorage[session_task_name]));
		 } else {
		 	alert('sorry '+$scope.task.task_name+' already exist, but you can still remove, edit, or use a different name!')
		 }
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
			$scope.currentTask.splice(name, 1);
		}else{
			alert('hmm something went wrong, please reload the page and try again.')
		}
	};
	//remove all task from routine
	$scope.removeAllTask = function(){
		console.log($scope.currentTask,"sesStor",sessionStorage)
		if($scope.currentTask.length > 1){
			if (confirm('Are you sure you want to clear your task?')){
			    console.log("yeuyspe");
			    sessionStorage.clear();
			    $scope.currentTask=[];
			}
		}else{
			sessionStorage.clear();
			$scope.currentTask=[];
		}
	}
	//run initial functions for SPA
	//initial run of loop to pull up current task
	get_session_task();
}]);