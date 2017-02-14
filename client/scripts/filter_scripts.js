//Custom Front End Filter
TCommander.filter('total_duration_conversion', [function() {

  // Create the return function
  // set the required parameter name to **number**
    // return function(seconds) {
    //     return new Date(1970, 0, 1).setSeconds(seconds);
    // };

    return function sec2str(t){
    var d = Math.floor(t/86400),
        h = ('0'+Math.floor(t/3600) % 24).slice(-2),
        m = ('0'+Math.floor(t/60)%60).slice(-2),
        s = ('0' + t % 60).slice(-2);
    return (d>0?d+'day(s) ':'')+(h>0?h+'hour(s) ':'')+(m>0?m+'minute(s) ':'')+(t>60?s+'second(s)':s+'s');
}
}]);