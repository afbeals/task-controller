//Front End Directives
//Routine Creation Directive

TCommander.directive('tcsidetab', [function() {
	var linker = function(scope, element, attrs){
		$('#openSide').on('click',function(){
			var showSize = $('#sideTab select option').length;
		   

		    $('#sideTab').animate({width: '250px'}, 100, function() {
		    	 $('.createRoutine #sideTab .prefillOptions').fadeIn(2000);
		    });
   			$('#sideTab select').attr('size',showSize);
		});
		$('#closeTab').on('click',function(){
			$('.createRoutine #sideTab .prefillOptions').hide(100);
			$('#sideTab').animate({width: '0px'}, 100, function() {});
		})
	}
	return {
		restrict: 'EA',
        link: linker
    }
}]);

TCommander.directive('tccomponentscroll', [function() {
	var links = function(scope, element, attrs){
		$('#cn-button').on('click',function(){
			$('html, body').animate({
		        scrollTop: 0
		    }, 800);
		});
	}
	return {
		restrict: 'EA',
        link: links
    }
}]);