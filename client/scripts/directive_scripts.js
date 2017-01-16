//Front End Directives
//Routine Creation Directive

TCommander.directive('tcsidetab', [function() {
	var linker = function(scope, element, attrs){
		$('#openSide').on('click',function(){
		    $('.createRoutine #sideTab .prefillOptions').css('display','block');
		    $('#sideTab').css('width','250px');
		});
		$('#closeTab').on('click',function(){
			$('.createRoutine #sideTab .prefillOptions').css('display','none');
			$('#sideTab').css('width','0px');
		})
	}
	return {
		restric: 'EA',
        link: linker
    }
}]);
